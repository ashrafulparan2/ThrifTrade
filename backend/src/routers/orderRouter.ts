import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { Order, OrderModel } from '../models/orderModel'
import { Product, ProductModel } from '../models/productModel'
import { isAuth } from '../utils'
import { AuctionModel } from "../models/auctionModel";
import { UserModel } from '../models/userModel'

export const orderRouter = express.Router()

orderRouter.get(
    '/mine',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const orders = await OrderModel.find({ user: req.user._id })
        res.json(orders)
    })
)


orderRouter.get(
    // /api/orders/:id
    '/:id',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id)
        if (order) {
            res.json(order)
        } else {
            res.status(404).json({ message: 'Order Not Found' })
        }
    })
)

orderRouter.post(
    '/',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        // console.log(req.body.orderItems);
        const orderItems = req.body.orderItems;
        let totalPrice = 0;
        for (let idx = 0; idx < orderItems.length; idx++) {
            const item = orderItems[idx];
            // console.log(item['_id'])
            // ProductModel.findOne({slug: item['_id']})
            const [product_data, auction_data] = await Promise.all([
                ProductModel.findById(item['_id']),
                AuctionModel.findOne({ product: { _id: item['_id'] } }).populate('maxBidUser')
            ]);
            if (!product_data) {
                throw new Error("Product Not Found")
            }
            // console.log(Number.parseInt(orderItems[idx].quantity) * product_data.price)
            totalPrice += Number.parseInt(orderItems[idx].quantity) * product_data.price;
            if (!!auction_data && product_data.is_auction) {
                const deadline = new Date(auction_data.deadline);
                const now = new Date();
                if (now < deadline) {
                    throw new Error("Auction isn't Ended yet")
                }
                if (req.user._id === auction_data.maxBidUser) {
                    throw new Error("You are not the highest bidder")
                }
                if (auction_data.maxBid && auction_data.maxBid !== 0) {
                    totalPrice -= Number.parseInt(orderItems[idx].quantity) * product_data.price;
                    totalPrice += auction_data.maxBid;
                    orderItems[idx]['price'] = auction_data.maxBid;
                }
            }

        }
    if(await is_gold_member(req.user.email)){
        totalPrice = totalPrice*.95;
    }

        // console.log(totalPrice);
        // res.send({orderItems, totalPrice});


        if (req.body.orderItems.length === 0) {
            res.status(400).json({ message: 'Cart is empty' })
        } else {
            console.log(req.body.orderItems)
            const createdOrder = await OrderModel.create({
                orderItems: req.body.orderItems.map((x: Product) => ({
                    ...x,
                    product: x._id,
                })),
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: totalPrice,
                shippingPrice: req.body.shippingPrice,
                taxPrice: totalPrice*.15,
                totalPrice: totalPrice+totalPrice*.15,
                user: req.user._id,
            } as Order)
            console.log(createdOrder)
            res.status(201).json({ message: 'Order Created', order: createdOrder })
        }
    })
)

const be_member = async (email: string) => {
    try {
        const user_data = await UserModel.findOne({ email: email });
        if (user_data) {
            user_data.isGoldMember = true;
            await user_data.save();
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}
const is_gold_member = async (email: string) => {
    try {
        const user_data = await UserModel.findOne({ email: email });
        if (user_data) {
            if(user_data.isGoldMember) {
                return true;
            }
        }
        return false;
    } catch (err) {
        return false;
    }
}


orderRouter.put(
    '/:id/pay',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        const order = await OrderModel.findById(req.params.id)
        if (order) {
            console.log(order?.orderItems)
            for (let i = 0; i < order.orderItems.length; i++) {
                if (order.orderItems[i].name === "Gold Card") {
                    const GoldMemberDone = await be_member(req.user.email);
                    if (!GoldMemberDone) {
                        res.status(404).send({
                            message: "Gold member failed"
                        })
                        return;
                    }
                    break;
                }
            }
            order.isPaid = true
            order.paidAt = new Date(Date.now())
            order.paymentResult = {
                paymentId: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            }
            const updatedOrder = await order.save()

            res.send({ order: updatedOrder, message: 'Order Paid Successfully' })
        } else {
            res.status(404).json({ message: 'Order Not Found' })
        }
    })
)