const bcrypt = require('bcrypt')
const helper = {}
helper.hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        return Promise.reject(error)
    }
}
helper.comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}
module.exports = helper;