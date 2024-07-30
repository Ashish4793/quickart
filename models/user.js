import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: [
            {
                name: String,
                streetAddress: String,
                city: String,
                zip: String,
                phone: String,
            }
        ],
        default: []
    },
    verified: {
        type: Boolean,
        default: false,
    },
    stripeCustomerId: {
        type: String,
        required: false,
        unique : true,
    },
    stripeSubscriptionId: {
        type: String,
        required: false,
    },
    newSubscriber : {
        type: Boolean,
        required : true,
        default : true
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'inactive',
    }
});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User' , userSchema);

export default User;