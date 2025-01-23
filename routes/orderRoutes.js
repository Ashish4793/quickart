import express from 'express';
import { createOrder, handleSuccessCallback, showPaymentMethodPage , getOrderCancellationDetails , processOrderCancellation, refundStatus, processCodOrder , paymentForCOD,codOrderPaymentResponse , invoiceGenerate } from '../controllers/orderController.js';
import { webHookController } from '../controllers/webhookController.js';
const router = express.Router();

router.post('/payment-method' , showPaymentMethodPage);

router.post('/create-checkout-session' , createOrder);

router.get('/paymentResponse' , handleSuccessCallback);

router.get('/paymentFailed' , (req,res) => {
    res.render('order-fail');
});

router.get('/order-cancellation' , getOrderCancellationDetails);

router.post('/process-order-cancellation' , processOrderCancellation);

router.post('/process-cod-order' , processCodOrder);

router.get('/track-refund-status' , refundStatus);

router.get('/process-cod-order-payment', paymentForCOD);

router.get('/cod-order-payment-response', codOrderPaymentResponse);

router.get('/invoice' , invoiceGenerate);

export default router;