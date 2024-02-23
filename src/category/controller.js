const dbHelper = require('./dbHelper');

const controller = {}
controller.createcategory = async (req) => {
    try {
        if (!req.body.name) return 'field required';
        const existingCategory = await dbHelper.checkCategory(req.body.name);
        if (existingCategory) {
            return 'category already exists'
        }
        return await dbHelper.createcategory(req.body.name);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.updatecategory = async (req) => {
    try {
        if (!req.body.name && !req.body.categoryId) return 'field required';

        return await dbHelper.updatecategory(req.body.categoryId, req.body.name);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getAllCategories = async () => {
    try {
        return await dbHelper.getAllCategories();
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