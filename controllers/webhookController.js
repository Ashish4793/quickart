import User from "../models/user.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);

export const webHookController = async (req,res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        try {
            const fetchOrder = await Order.findOne({ stripe_cs_id: session.id }).exec();
            if (fetchOrder && fetchOrder.status === 'Pending') {
                if (fetchOrder.status === 'Processing') {
                    console.log(`${fetchOrder.orderNumber}ID: order already proccessed`)
                    return res.status(200).json({ received: true });

                }
                const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
                const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);

                await Cart.updateOne({ user: fetchOrder.user }, { $set: { items: [] } }).exec();

                await Order.findOneAndUpdate(
                    { _id: fetchOrder._id },
                    {
                        $set: {
                            status: "Processing",
                            stripe_pi_id: session.payment_intent,
                            paymentStatus: "Paid",
                            paymentMethod: paymentMethod.type,
                        },
                    },
                    { new: true }
                ).populate('items.product').exec();
                console.log(`${fetchOrder.orderNumber}ID: order proccessed successfully`)
            }
        } catch (error) {
            console.error('Error processing order:', error);
        }
    }
    res.status(200).json({ received: true });
}