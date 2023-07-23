import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose'
import { Product } from './productModel'
import { User } from './userModel'


@modelOptions({ schemaOptions: { timestamps: true } })
export class AuctionData {
    public _id!: string

    @prop({ ref: Product, required: true,unique: true })
    public product!: Ref<Product>

    @prop({ required: true, default: 0 })
    public maxBid?: number

    @prop({ ref: User })
    public maxBidUser?: Ref<User>

    @prop( { required: true})
    public deadline!: number

    @prop({ required: false, default: false })
    public isEndProcessDone?: boolean
}

export const AuctionModel = getModelForClass(AuctionData)