const dbHelper = require('./dbHelper');
const wishlistViewModel = require('./viewModel');

const controller = {}
controller.addToWishlist = async (req) => {
    try {
        if (!req.body.productId) return 'field required';
        const existingWishlist = await dbHelper.checkWishlist(req.body.productId, req.body.userId);
        if (existingWishlist) {
            return 'wishlist already exists';
        }
        const viewModel = wishlistViewModel.createViwModel(req);
        return await dbHelper.addToWishlist(viewModel);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.checkWishlist = (req) => {
    try {
        return dbHelper.checkWishlist(req.params.productId, req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getAllWishlistProducts = async (req) => {
    try {
        return await dbHelper.getAllWishlistProducts(req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.deleteByProductIdAndUserId = async (req) => {
    try {
        return await dbHelper.deleteByProductIdAndUserId(req.params.productId, req.params.userId)
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = controller;