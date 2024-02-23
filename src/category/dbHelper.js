
const CategorySchema = require('./model')
const dbHelper = {}

dbHelper.createcategory = async (name) => {
    try {
        const obj = new CategorySchema({ name });
        return await obj.save();
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.checkCategory = (name) => {
    try {
        return CategorySchema.findOne({ name });
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.getAllCategories = () => {
    try {
        return CategorySchema.find({});
    } catch (error) {
        return Promise.reject(error)
    }
}


dbHelper.updatecategory = async (categoryId, _name) => {
    try {
        return await CategorySchema.findOneAndUpdate({ _id: categoryId },
            { $set: { name: _name } }, { new: true });

    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.deleteCategoryById = (categoryId) => {
    try {
        return CategorySchema.findByIdAndDelete({ _id: categoryId });
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = dbHelper;