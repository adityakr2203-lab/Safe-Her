const userModel = require('../models/user.model');


module.exports.registerUser = async ({
    fullname,email,password,mobile

}) => {
    if (!fullname || !email || !password || !mobile) {
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname,
        email,
        password,
        mobile
    })
    
    return user;
}