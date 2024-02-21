
const { Types } = require('mongoose')
const CartSchema = require('./model')
const dbHelper = {}

dbHelper.addToCart = async (input) => {
    try {

        const obj = new CartSchema(input);
        return obj.save();
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.checkCart = async (productId, userId) => {
    try {
        const res = await CartSchema.findOne({ productId, userId });
        if (res?._id) {
            return res
        }
        return false
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.getAllCartItemsByUserId = (userId) => {
    try {
        return CartSchema.find({ userId }).sort({ createdDate: -1 }).lean();
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getCartItemCountByUserId = (userId) => {
    try {
        return CartSchema.countDocuments({ userId });
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.deleteById = (cartId) => {
    try {
        return CartSchema.findByIdAndDelete({ _id: cartId });
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.deleteCartItemByUserIdAndProductId = (productId, userId) => {
    try {
        return CartSchema.deleteOne({ productId, userId })
    } catch (error) {

    }
}
module.exports = dbHelper;