const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, mobile } = req.body;

    const hasedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        fullname,
        email,
        password: hasedPassword,
        mobile
    });

    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
    






}