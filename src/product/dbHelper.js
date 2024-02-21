
const ProductSchema = require('./model')
const dbHelper = {}

dbHelper.createproduct = async (input) => {
    try {
        const obj = new ProductSchema(input);
        return await obj.save();
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.updateproduct = async (viewModel, id) => {
    try {
        return await ProductSchema.updateOne({ _id: id }, { $set: { ...viewModel } }, { new: true })
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.searchProduct = async (searchText) => {
    try {
        const regex = new RegExp(searchText, 'i');
        return await ProductSchema.find({
            $or: [
                { name: { $regex: regex } },
                { description: { $regex: regex } },
            ],
        })
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getAllProduct = (skipNumber, perPage) => {
    try {
        const skip = (skipNumber - 1) * perPage;
        return ProductSchema.find({}).sort({ createdDate: -1 }).skip(skip).limit(perPage);
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getProductById = (id) => {
    try {
        return ProductSchema.findOne({ _id: id })
    } catch (error) {
        return Promise.reject(error)
    }
}


dbHelper.getProductPhotoById = (id) => {
    try {
        return ProductSchema.findOne({ _id: id }).select({ photo: 1 }).lean();
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getProductsByCategory = (_categoryId) => {
    try {
        return ProductSchema.find({ categoryId: _categoryId }).lean();
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.deleteproductById = (productId) => {
    try {
        return ProductSchema.deleteOne({ _id: productId });
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getProductByCategories = (categoryIdArray, minPrice, maxPrice, skipNumber, perPage) => {
    try {
        const skip = (skipNumber - 1) * perPage;

        return ProductSchema.find({
            $or: [
                {
                    $and: [
                        { categoryId: { $in: categoryIdArray } },
                        { price: { $gt: minPrice, $lt: maxPrice } },
                    ],
                },
                {
                    categoryId: { $in: categoryIdArray },
                },
                {
                    price: { $gt: minPrice, $lt: maxPrice },
                },
            ],
        }).skip(skip).limit(perPage).sort({ createdDate: -1 })
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = dbHelper;