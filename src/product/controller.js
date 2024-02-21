const dbHelper = require('./dbHelper');
const productViewModel = require('./viewModel');

const controller = {}
controller.createproduct = async (req) => {
    try {
        if (!req.body.name) return 'field required';
        const model = productViewModel.createViewModel(req)
        return await dbHelper.createproduct(model);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.searchProduct = async (req) => {
    try {
        if (!req.params.searchText) return 'field required';
        return await dbHelper.searchProduct(req.params.searchText);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.updateproduct = async (req) => {
    try {
        if (!req.body) return 'field required';
        const updateViewModel = productViewModel.updateViewModel(req);
        return await dbHelper.updateproduct(updateViewModel, req.body._id);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getAllProduct = async (req) => {
    try {
        return await dbHelper.getAllProduct(parseInt(req.params.pageNumber, 10), parseInt(req.params.perPage, 10));
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getProductById = async (req) => {
    try {
        return await dbHelper.getProductById(req.params.id);
    } catch (error) {
        return Promise.reject(error)
    }
}


controller.deleteproductById = async (req) => {
    try {
        if (!req.params.id) return 'field required';
        return await dbHelper.deleteproductById(req.params.id);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getProductPhotoById = async (req) => {
    try {
        return await dbHelper.getProductPhotoById(req.params.id)
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getProductsByCategory = async (req) => {
    try {
        if (!req.params.categoryId) return 'field required';
        return await dbHelper.getProductsByCategory(req.params.categoryId);
    } catch (error) {

    }
}

controller.getProductByCategories = async (req) => {
    try {
        return await dbHelper.getProductByCategories(req.body.categoryId, req.body.minPrice, req.body.maxPrice
            , parseInt(req.body.pageNumber, 10), parseInt(req.body.perPage, 10));
    } catch (error) {

    }
}
module.exports = controller;