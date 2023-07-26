import express, {NextFunction, Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {ProductModel} from '../models/productModel'
import {sampleProducts} from "../data";
import {User, UserModel} from "../models/userModel";
import {AuctionData, AuctionModel} from "../models/auctionModel";
import {isAuth} from "../utils";
// import auction_data from '../auction_data.json'

export const auctionRouter = express.Router()

auctionRouter.get(
    '/get_bid_data/:slug',
    asyncHandler(async (req: Request, res: Response) => {
        try {
            // console.log(req.params.slug);
            const product = await ProductModel.findOne({slug: req.params.slug});
            if (!product) {
                throw new Error("Product Not Found")
            }
            const auction_data = await AuctionModel.findOne({
                product: {
                    _id: product._id
                }
            }).populate('product').populate('maxBidUser');

            if (!auction_data) {
                throw new Error("Auction Data Not Found")
            }
            const deadline = auction_data.deadline;
            const now = Date.now();
            if (now > deadline && auction_data.isEndProcessDone === false) {
                await Promise.all([
                    ProductModel.findByIdAndUpdate(product._id, {price: auction_data.maxBid}),
                    AuctionModel.findByIdAndUpdate(auction_data._id, {isEndProcessDone: true})
                ])
            }
            res.status(200).send({AuctionData: auction_data})
        } catch (e) {

            res.status(400).send({message: e})
        }
    })
)

auctionRouter.post(
    '/make_bid',
    isAuth,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log(req.body);
            const product = await ProductModel.findOne({slug: req.body.slug});
            if (!product) {
                throw new Error("Product Not Found")
            }
            const auction_data = await AuctionModel.findOne({
                product: {
                    _id: product._id
                }
            });
            if (!auction_data) {
                throw new Error("Auction Data Not Found")
            }
            // console.log(auction_data);
            const deadline = new Date(auction_data.deadline);
            const now = new Date();

            if (now > deadline) {
                throw new Error("Deadline Passed")
            }
            const maxBid = auction_data.maxBid!;
            // console.log(maxBid);

            if (maxBid > Number.parseFloat(req.body.bidPrice)) {
                throw new Error("Bid Price is less than max bid")
            }
            // console.log("req",req.user)
            const user_data = await UserModel.findOne({email: req.user.email});
            // console.log("database",user_data)
            if (!user_data) {
                throw new Error("User Not Found")
            }
            const update_auction_data = await AuctionModel.updateOne({_id: auction_data._id}, {
                maxBid: Number.parseFloat(req.body.bidPrice),
                maxBidUser: user_data._id
            })
            console.log(update_auction_data);
            // auction_data.set('maxBid', Number.parseFloat(req.body.bidPrice));
// = Number.parseFloat(req.body.bidPrice);
//             auction_data.set('maxBidUser', user_data);
            // auction_data.maxBidUser = user_data;
            // await auction_data.save();


            res.status(201).json({message: "Bid Placed Successfully"});
        } catch (err) {
            // console.log(err);
            next(err)
            // res.status(400).json({message: err});
        }
    })
);

auctionRouter.post(
    '/add_to_auction',
    isAuth,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const {product_slug, deadline} = req.body;
        try {
            const [product_data, user_data] = await Promise.all([
                ProductModel.findOne({slug: product_slug}),
                UserModel.findOne({email: req.user.email}),
                ProductModel.updateOne({slug: product_slug}, {is_auction: true})
            ]);
            if (!user_data) {
                throw new Error("User Not Found");
            }
            if (!user_data.isAdmin) {
                throw new Error("You are not Admin")
            }
            if (!product_data) {
                throw new Error("Product Not Found");
            }
            const auction_data = await AuctionModel.create({
                product: product_data,
                deadline: deadline,
                maxBid: 0,
            });
            res.status(200).json({message: "Auction Created Successfully", auction_data});
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            res.status(400).json({message: e['message']});
        }
    })
)
auctionRouter.get(
    '/get_auction_products',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auction_data = await AuctionModel.find().populate('product');
            res.status(200).json(auction_data);
        } catch (e) {
            next(e);
        }
    })
)

auctionRouter.get(
    '/end_auction/:slug',
    isAuth,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {

            const product = await ProductModel.findOne({slug: req.params.slug});
            if (!product) {
                throw new Error("Product Not Found")
            }
            // UserModel.findOne({email: req.user.email}),
            const [auction_data,user_data] = await Promise.all([
                AuctionModel.findOne({product: {_id: product._id}}),
                UserModel.findOne({email: req.user.email})
            ]);

            if (!auction_data) {
                throw new Error("Auction Data Not Found")
            }
            if (!user_data) {
                throw new Error("User Not Found");
            }
            if (!user_data.isAdmin) {
                throw new Error("You are not Admin")
            }
            const now = Date.now();
            auction_data.set('deadline', now);
            await auction_data.save();
            res.status(200).send({AuctionData: auction_data})
        } catch (e) {

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            res.status(400).send({message: e['message']})
        }
    })
)

