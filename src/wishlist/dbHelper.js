
const WishlistSchema = require('./model')
const dbHelper = {}

dbHelper.addToWishlist = async (input) => {
    try {
        const obj = new WishlistSchema(input);
        return await obj.save();
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.checkWishlist = async (productId, userId) => {
    try {
        const result = await WishlistSchema.findOne({ productId, userId });
        return result?._id ? result : false
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.getAllWishlistProducts = (userId) => {
    try {
        return WishlistSchema.find({ userId });
    } catch (error) {
        return Promise.reject(error)
    }
}


dbHelper.deleteByProductIdAndUserId = (pId, uId) => {
    try {
        return WishlistSchema.deleteOne({ productId: pId, userId: uId });
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = dbHelper;