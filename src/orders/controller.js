const dbHelper = require('./dbHelper');
const orderViewModel = require('./viewModel');

const controller = {}
controller.createOrder = async (req) => {
    try {
        if (!req.body.productId && !req.body) return 'field required'
        const orderInput = orderViewModel.createViewModel(req)
        return await dbHelper.createOrder(orderInput);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.updateShippingStatus = async (req) => {
    try {
        if (!req.body.shipping && !req.body.orderId) return 'field required';

        return await dbHelper.updateShippingStatus(req.body.shipping, req.body.orderId);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getAllOrders = async () => {
    try {
        return await dbHelper.getAllOrders();
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getAllOrdersByUserId = async (req) => {
    try {
        if (!req.params.userId) return 'field required'
        return await dbHelper.getAllOrdersByUserId(req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}


controller.deleteCategoryById = async (req) => {
    try {
        return await dbHelper.deleteCategoryById(req.params.id)
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = controller;