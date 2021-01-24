const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const authenticate = require('../middlewares/athenticate');
const HttpError = require('../http-error');
const User = require('../models/userSchema');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'User Router Setup' });
});

router.post('/signup',
    [check('userName', 'Username length should be 4').isLength({ min: 4 }),
    check('emailId', 'Please !,enter valid email id').isEmail(),
    check('password', 'Password length should be 6').isLength({ min: 6 })],

    async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userName, emailId, password, role } = req.body;

        let existingUser;
        try {
            existingUser = await User.findOne({ emailId });
        } catch (err) {
            const error = new HttpError('Signing up failed,please try again.', 500);
            return next(error);
        }

        if (existingUser) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'User already exists,please try logging in', param: "emailId" }] });
        }

        let hashedpassword;
        try {
            hashedpassword = await bcrypt.hash(password, 10);
        } catch (err) {
            const error = new HttpError('Could not create user,please try again', 500)
            return next(error);
        }

        const createdUser = new User({
            userName,
            emailId,
            password: hashedpassword,
            role: role
        });

        let isMatch = false;
        if (req.body.companyId === "HCL256") {
            isMatch = true;
        } else {
            isMatch = false;
        }

        try {
            if (isMatch) {
                await createdUser.save();
            } else {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Please, enter valid company id', param: "companyId" }] });
            }
        } catch (err) {
            const error = new HttpError(
                'Error while saving data',
                500
            );
            return next(error);
        }

        res.status(201).json({ userId: createdUser.id, emailId: createdUser.emailId });
    });

router.post('/login', [
    check('emailId', 'Please include a valid email').isEmail(),
    check('password', 'Password length should be 6 digits').isLength({ min: 6 })
], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { emailId, password } = req.body;

    let existingUser;
    // existing user in database check
    try {
        existingUser = await User.findOne({ emailId });
    } catch (err) {
        const error = new HttpError('Logging in failed,please try again', 500);
        return next(error);
    }

    if (!existingUser) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials', param: "" }] });
    }

    // password check
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Something went wrong' }] });
    }

    if (!isValidPassword) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Please, enter valid password', param: "password" }] });
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: existingUser.id,
                emailId: existingUser.emailId,
                role: existingUser.role,
                userName: existingUser.userName
            },
            'something_very_secure_and_private',
            { expiresIn: "432000000000" }
        );
    } catch (err) {
        return res
            .status(400)
            .json({ errors: [{ msg: 'Something went wrong' }] });
    }

    res.status(200).json({
        userId: existingUser.id, emailId: existingUser.emailId, token: token
    });

});

///////////////////////////////////////////////////////
router.get('/user', authenticate, (req, res) => {
    res.json(req.user)
});



module.exports = router;