const dbHelper = require('./dbHelper');
const JWT = require('jsonwebtoken')
const { hashPassword, comparePassword } = require('./helper');
const userViewModel = require('./viewModel');
const { getCartItemCountByUserId } = require('../cart/dbHelper');

const controller = {}
controller.signUp = async (req) => {
    try {
        if (!req.body && !req.body.userName && !req.body.email && !req.body.password && !req.body.question && !req.body.mobile) return "field required";
        const emailExists = await dbHelper.checkUserByEmail(req.body.email);
        if (emailExists) return "email already exists"
        const mobileNoExists = await dbHelper.checkUserByMobile(req.body.mobile);
        if (mobileNoExists) return "mobileNumber already exists"
        const hashedPassword = await hashPassword(req.body.password)
        const viewModels = userViewModel.signUpViewModel(req, hashedPassword);
        const result = await dbHelper.signUp(viewModels);
        const token = JWT.sign({ userId: result._id }, process.env.JWT_SECRET, { expiresIn: "10d" });
        const cartCount = await getCartItemCountByUserId(result._id)
        return { ...result._doc, token, cartCount }

    } catch (error) {
        return Promise.reject(error)
    }
}

controller.login = async (req) => {
    try {
        if (!req.body.email && !req.body.password) return "field required";
        const userExists = await dbHelper.checkUserByEmail(req.body.email);
        if (!userExists) return "user does not exist"
        const isValid = await comparePassword(req.body.password, userExists.password);
        if (!isValid)
            return "invalid credentials";
        const token = JWT.sign({ _id: userExists?._id }, process.env.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 });
        const cartCount = await getCartItemCountByUserId(userExists._id);

        return {
            email: userExists.email,
            _id: userExists?._id,
            mobile: userExists?.mobile,
            role: userExists?.role,
            userName: userExists?.userName,
            token, address: userExists?.address, cartCount
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.updateById = async (req) => {
    try {
        return dbHelper.updateById(req.decoded._id, req.body.userName);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.forgotpassword = async (req) => {
    try {
        if (!req.body.email && !req.body.question && !req.body.password) return "field required"
        return await dbHelper.forgotpassword(req.body.email, req.body.question, req.body.password);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getAllUsers = async () => {
    try {
        return await dbHelper.getAllUsers();

    } catch (error) {
        return Promise.reject(error)
    }
}

controller.getUserByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.getUserByUserId(req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.deleteUserByUserId = async (req) => {
    try {
        if (!req.params.userId) return "field required";
        return await dbHelper.deleteUserByUserId(req.params.userId);
    } catch (error) {
        return Promise.reject(error)
    }
}


controller.updateAddress = async (req) => {
    try {
        if (!req.decoded) return "field required"
        if (!req.decoded._id && !req.body.address) return "field required";
        return await dbHelper.updateAddress(req.decoded._id, req.body.address);
    } catch (error) {
        return Promise.reject(error)
    }
}

controller.updateUserDetails = async (req) => {
    try {
        if (!req.decoded) return "field required"
        if (!req.body) return "field required";
        const viewModelInput = userViewModel.updateUserDetails(req)
        return await dbHelper.updateUserDetails(viewModelInput);
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = controller;