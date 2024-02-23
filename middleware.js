const jwtToken = require('jsonwebtoken');
const dbHelper = require('./src/user/dbHelper');

const validationMiddleware = {}

validationMiddleware.validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        try {
            const decoded = jwtToken.verify(token.split(' ')[1], process.env.JWT_SECRET);

            console.log("dec", decoded)
            if (decoded) {
                const user = await dbHelper.getUserByUserId(decoded?.userId || decoded?._id);
                req.decoded = user;
                console.log("u", user)
                if (user)
                    next();
            }
            return 'no user found'
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        return Promise.reject(error)
    }
}
validationMiddleware.validateAdmin = async (req, res, next) => {
    try {
        console.log("dec", req.decoded)

        if (req?.decoded?.role === "admin")
            next();
        else
            return "unauthorized ,not an admin"
    } catch (error) {
        return Promise.reject(error)
    }
}
module.exports = validationMiddleware;