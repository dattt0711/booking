const {check} = require('express-validator');

const registerValidator = [
    check('username').notEmpty().withMessage('username must be required'),
    check('password').notEmpty().withMessage('password must be required'),
    check('fullName').notEmpty().withMessage('fullName must be required'),
    check('age').notEmpty().withMessage('age must be required'),
    check('phoneNumber').notEmpty().withMessage('phoneNumber must be required'),
    check('email').notEmpty().withMessage('email must be requiredy'),
    check('teamName').notEmpty().withMessage('teamName must be required'),
    check('level').notEmpty().withMessage('level must be required'),
];
const loginValidator = [
    check('username').notEmpty().withMessage('username must be required'),
    check('password').notEmpty().withMessage('password must be required'),
]
module.exports = {
    registerValidator,
    loginValidator,
};
