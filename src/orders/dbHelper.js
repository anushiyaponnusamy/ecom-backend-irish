
const OrderSchema = require('./model')
const dbHelper = {}

dbHelper.createOrder = async (input) => {
    try {
        const obj = new OrderSchema(input);
        return await obj.save();
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.getAllOrders = () => {
    try {
        return OrderSchema.find({});
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getAllOrdersByUserId = (userId) => {
    try {
        return OrderSchema.find({ userId });
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.updateShippingStatus = async (shipping, orderId) => {
    try {
        return await OrderSchema.findOneAndUpdate({ _id: orderId },
            { $set: { shipped: shipping } }, { new: true });

    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.deleteOrderById = (orderId) => {
    try {
        return OrderSchema.findByIdAndDelete({ _id: orderId });
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = dbHelper;