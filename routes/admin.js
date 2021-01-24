const express = require('express');
const router = express.Router();

const authenticate = require('../middlewares/athenticate');
const HttpError = require('../http-error');
const Admin = require('../models/adminSchema');
const Users = require('../models/userSchema');

// @desc    get all leave applications (Admin)
// @route   GET /admin/l_forms
// @access  Private
router.get('/l_forms', authenticate, async (req, res, next) => {

    let getAllLeaveForms;
    try {
        getAllLeaveForms = await Admin.find({}).sort({ _id: -1 }).populate({ path: 'userInfo' }).exec();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(201).json({
        getAllLeaveForms
    });
})

// @desc    get my leave applns (Admin)
// @route   GET /admin/my_l_forms
// @access  Private
router.get('/my_l_forms', authenticate, async (req, res, next) => {
    let my_leave_forms;
    try {
        my_leave_forms = await Admin.find({ userId: req.user.userId })
            .sort({ _id: -1 })
            .exec();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json(my_leave_forms)
})

router.get('/share', authenticate, async (req, res, next) => {
    let emp_creds;
    try {
        emp_creds = await Users.find({ role: "Employee" })
            .sort({ _id: -1 })
            .exec();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json(emp_creds)
})

module.exports = router;