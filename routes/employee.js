const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const authenticate = require('../middlewares/athenticate');
const HttpError = require('../http-error');
const validationError = require('../employeesErrors');
const generatePassword = require('../utils/generatePassword');
const Employee = require('../models/employeeSchema');
const User = require('../models/userSchema');
const Admin = require('../models/adminSchema');

// @desc    post employee details (Admin)
// @route   POST /emp
// @access  Private
router.post('/', authenticate, async (req, res, next) => {
    const { errors, isValid } = validationError(req.body);
    console.log(errors)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    let existedEmailId;
    try {
        existedEmailId = await Employee.findOne({ emailId: req.body.emailId }).exec();
    } catch (err) {
        const error = new HttpError('Error occurs during finding email id', 500);
        return next(error);
    }

    if (existedEmailId) {
        res.status(200).json({ message: "Email is already in use" });
    }

    const {
        fullName,
        emailId,
        contactNo,
        gender,
        role,
        team,
        hireDate,
        bankName,
        bankAC,
        DOB,
        location
    } = req.body

    const New_Employee = new Employee({
        fullName,
        emailId,
        contactNo,
        gender,
        role,
        team,
        hireDate,
        empID: Math.random().toString(36).substring(7).toUpperCase(),
        bankName,
        bankAC,
        DOB,
        location,
    })

    const password = generatePassword();
    let hashedpassword;
    try {
        hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
        const error = new HttpError('Could not create user,please try again', 500)
        return next(error);
    }
    // console.log(typeof password,typeof hashedpassword)

    const FullName = fullName.split(' ').join('_')
    const Create_employee_credential = new User({
        userName: FullName,
        emailId,
        password: hashedpassword,
        original_password: password,
        role: 'Employee',
    })

    try {
        await New_Employee.save()
        await Create_employee_credential.save()
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json({
        Employee_info: New_Employee,
        Employee_cred: Create_employee_credential
    });
})

// @desc    get all employee details (Admin)
// @route   GET /emp
// @access  Private
router.get('/', authenticate, async (req, res, next) => {
    let Employees;
    try {
        Employees = await Employee.find({}).sort({ _id: -1 });
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json(Employees);
})

// @desc    get employee details by id 
// @route   GET /emp/:id
// @access  Private
router.get('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    let employee_details;
    try {
        employee_details = await Employee.findOne({ empID: id });
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }
    console.log(employee_details)
    if (employee_details) {
        res.status(200).json(employee_details);
    } else {
        res.status(400).json({ message: "Enter valid employee id" });
    }
})

// @desc    update employee details by id (Admin)
// @route   PUT /emp/:id
// @access  Private
router.put('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    const {
        firstName,
        fatherName,
        lastName,
        emailId,
        contactNo,
        role,
        team,
        salary
    } = req.body;

    let getEmployee;
    try {
        getEmployee = await Employee.findByIdAndUpdate({ _id: id }, {
            firstName,
            fatherName,
            lastName,
            emailId,
            contactNo,
            role,
            team,
            salary
        }, { new: true }).exec();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json({
        employee_details: getEmployee,
    });
})

// @desc    delete employee details by id (Admin)
// @route   DELETE /emp/:id
// @access  Private
router.delete('/:id', authenticate, async (req, res, next) => {
    const { id } = req.params;
    let employee_details;
    try {
        employee_details = await Employee.findByIdAndDelete({ _id: id });
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json({
        message: "Employee Info Deleted Successfully",
        employee_id: employee_details._id
    });
})

// @desc    post employee leave application (Admin)
// @route   POST /emp/l_form
// @access  Private
router.post('/l_form', authenticate, async (req, res, next) => {
    const {
        typeOfleave,
        reason,
        from,
        to
    } = req.body;

    const Leave_form_details = new Admin({
        userId: req.user.userId,
        userInfo: req.user.userId,
        typeOfleave,
        reason,
        from,
        to
    })

    try {
        await Leave_form_details.save();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json({
        "message": "Leave application submitted successfully",
        leaveForm: Leave_form_details
    })
})



// @desc    update status of employee leave application (Admin)
// @route   PUT /emp/status/:id
// @access  Private
router.patch('/status', authenticate, async (req, res, next) => {
    const { status, id } = req.body;

    console.log(req.body)

    let updatedInfo;
    try {
        updatedInfo = await Admin.findOneAndUpdate(
            { _id: id },
            { $set: { status } },
            { new: true }
        ).exec();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json({
        updatedInfo
    })
})

router.post('/payroll/:id', async (req, res, next) => {
    const {
        from, to,
        total_days, medical, pf, convence, net_salary, userId,
        basic, hRent, bonus, profTax, provFund, incomeTax
    } = req.body;
    console.log(req.body)
    console.log(req.params)
    const payroll = {
        from, to,
        total_days, medical, pf, convence, net_salary,
        userId,
        basic, hRent, bonus, profTax, provFund, incomeTax
    }
    const { id } = req.params;
    let find_employee;
    try {
        find_employee = await Employee.findOneAndUpdate({ empID: id }, {
            $push: {
                payroll: payroll
            }
        }, {
            new: true
        }).exec();
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }

    res.status(200).json(find_employee);

})

router.get('/my_slips/:emailId', async (req, res, next) => {
    const { emailId } = req.params;

    let get_my_slips;
    try {
        get_my_slips = await Employee.findOne({ emailId: emailId }).select({ payroll: -1, _id: 0 });
        get_data = await Employee.findOne({ emailId: emailId }).exec()
    } catch (err) {
        const error = new HttpError('Something went wrong', 500);
        return next(error);
    }
    res.status(200).json({ payroll: get_my_slips.payroll, get_data });
})

module.exports = router;