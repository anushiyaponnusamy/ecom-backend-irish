const { hashPassword, comparePassword } = require('./helper');
const UserSchema = require('./model')
const { Types } = require('mongoose');
const dbHelper = {}

dbHelper.signUp = async (req) => {
    try {
        const obj = new UserSchema(req);
        return await obj.save();
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.forgotpassword = async (email, question, password) => {
    try {
        const user = await UserSchema.findOne({ email, question });
        if (!user) {
            return "email or secret question invalid";
        } else {
            const hashedPassword = await hashPassword(password)
            const result = await UserSchema.updateOne({ email, question }, { password: hashedPassword })
            if (result.modifiedCount === 1) {
                return "password changed";
            } else {
                return "password unchanged"
            }

        }

    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.checkUserByEmail = (email) => {
    try {
        return UserSchema.findOne({ email });
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.checkUserByMobile = (mobile) => {
    try {
        return UserSchema.findOne({ mobile });
    } catch (error) {
        return Promise.reject(error)
    }
}
dbHelper.updateById = async (userId, uName) => {
    try {
        return await UserSchema.findOneAndUpdate({ _id: userId }, { $set: { userName: uName } }, { new: true });

    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getAllUsers = () => {
    try {
        return UserSchema.find({ active: true });
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getUserByUserId = (userId) => {
    try {
        return UserSchema.findOne({ _id: userId, active: true });
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.getUserByUserId = (userId) => {
    try {
        return UserSchema.findOne({ _id: userId, active: true });
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.deleteUserByUserId = (userId) => {
    try {
        return UserSchema.updateOne({ _id: userId }, { active: false });
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.updateAddress = (userId, _address) => {
    try {
        return UserSchema.findOneAndUpdate({ _id: userId }, { $set: { address: _address } }, { new: true });
    } catch (error) {
        return Promise.reject(error)
    }
}

dbHelper.updateUserDetails = (input) => {
    try {
        return UserSchema.findOneAndUpdate({ _id: input?._id }, { $set: { ...input } }, { new: true });
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = dbHelper;