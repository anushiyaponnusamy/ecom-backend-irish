
const Razorpay = require("razorpay");
const crypto = require('crypto');

const controller = {}
controller.success = async (req) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
        if (!orderCreationId &&
            !razorpayPaymentId &&
            !razorpayOrderId &&
            !razorpaySignature) return 'field required'
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");
        console.log("digest !== razorpaySignature", digest !== razorpaySignature)
        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return { msg: "Transaction not legit!" };

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        return {
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.orders = async (req) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        return order;
    } catch (error) {
        Promise.reject(error);
    }
}
module.exports = controller;