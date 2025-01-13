import mongoose, { Mongoose } from "mongoose";
import subscriptions from "razorpay/dist/types/subscriptions";


const subscriptionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    subscriptionID : {
        type : String,
        required : true
    },
    stripe_cs_id : {
        type : String,
        required : true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'canceled', 'past_due', 'trialing'],
        default: 'inactive',
        required: true
      },
})