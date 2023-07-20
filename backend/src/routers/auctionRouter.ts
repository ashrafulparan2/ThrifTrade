import express from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import { sampleProducts } from "../data";
import { User } from "../models/userModel";
// import auction_data from '../auction_data.json'

export const auctionRouter = express.Router()
// /api/prodcuts
const tempAuctionData = sampleProducts.map((product) => {
    return {
        product,
        auctionData: {
            deadline: Date.now()+100000,
            maxBid: 0,
            maxBidUser: User,
        }
    }
})
auctionRouter.get(
    '/get_bid_data/:slug',
    (req, res) => {
        console.log(req.params.slug)
        
        tempAuctionData.forEach((auction, idx) => {
            if (tempAuctionData[idx].product.slug === req.params.slug) {
                console.log(tempAuctionData[idx].auctionData)
                return res.status(200).json(tempAuctionData[idx].auctionData);
            }
        })
        return res.status(400).json({ message: "Wrong Product" });
    }
)

auctionRouter.post(
    '/make_bid',
    (req, res) => {
        // console.log(tempAuctionData)
        console.log(Number.parseFloat(req.body.bidPrice))

        tempAuctionData.forEach((auction, idx) => {
            if (tempAuctionData[idx].product.slug === req.body.slug) {
                if (tempAuctionData[idx].auctionData.maxBid < Number.parseFloat(req.body.bidPrice)) {
                    tempAuctionData[idx].auctionData.maxBid = Number.parseFloat(req.body.bidPrice);
                    tempAuctionData[idx].auctionData.maxBidUser = req.body.user;
                    console.log(tempAuctionData[idx])
                    return res.status(200).json({ message: "Bid Placed" });
                }
            }
        })
        return res.status(400).json({ message: "Bid Not Placed" });
    }
)

// auctionRouter.get(
//     '/get_auction_data',
//     (req, res) => {

//     }
// )