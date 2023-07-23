import express, {NextFunction, Request, Response} from 'express'
import asyncHandler from 'express-async-handler'
import {ProductModel} from '../models/productModel'
import {sampleProducts} from "../data";
import {User, UserModel} from "../models/userModel";
import {AuctionModel} from "../models/auctionModel";
import {isAuth} from "../utils";
// import auction_data from '../auction_data.json'

export const auctionRouter = express.Router()
// /api/prodcuts
const tempAuctionData = sampleProducts.map((product) => {
    return {
        product,
        auctionData: {
            deadline: Date.now() + 100000,
            maxBid: 0,
            maxBidUser: User,
        }
    }
})
auctionRouter.get(
    '/get_bid_data/:slug',
    isAuth,
    asyncHandler(async (req: Request, res: Response) => {
        console.log(req.params.slug);
        const product = await ProductModel.findOne({ slug: req.body.slug });
        const auction_data = await AuctionModel.findOne({
            product: product?._id
        })
        console.log(auction_data);
        if (auction_data) {
            res.status(200).send({AuctionData: auction_data})
        } else {
            res.status(400).send({message: "Auction Data Not Found"})
        }
    })
)

auctionRouter.post(
    '/make_bid',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auction_data = await AuctionModel.findOne({productSlug: req.body.slug});

            const isBidPlaced = {
                status: 400,
                data: {
                    message: "Bid Not Placed"
                }
            };

            if (auction_data) {
                const deadline = new Date(auction_data.deadline);
                const now = new Date();

                if (now < deadline) {
                    const maxBid = auction_data.maxBid!;

                    if (maxBid < Number.parseFloat(req.body.bidPrice)) {
                        const user_data = await UserModel.findOne({email: req.body.user.email});
                        if (user_data) {
                            if (user_data.balance < Number.parseFloat(req.body.bidPrice)) {
                                isBidPlaced.data.message= "Insufficient Balance";
                            } else {
                                auction_data.maxBid = Number.parseFloat(req.body.bidPrice);
                                auction_data.maxBidUser = user_data;
                                await auction_data.save();
                            }
                        }
                    }
                }else{
                    isBidPlaced.data.message= "Auction Deadline Passed";
                }
            }
            res.status(isBidPlaced.status).json(isBidPlaced.data);
        } catch (err) {
            next(err);
        }
    })
);


// auctionRouter.get(
//     '/get_auction_data',
//     (req, res) => {

//     }
// )