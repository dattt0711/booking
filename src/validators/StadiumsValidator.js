const {check} = require('express-validator');
const {validateObjectId} = require('../utils/shared');
const isStadiumObjIdValidator = validateObjectId('stadiumObjId', true);
const createValidator = [
    check('name').notEmpty().withMessage('name must be required'),
    check('address').notEmpty().withMessage('address must be required'),
    check('rentalTime').notEmpty().isArray().withMessage('rentalTime must be array'),
    check('order').notEmpty().isArray().withMessage('order must be array'),
    check('image').notEmpty().withMessage('order must be required'),
];
const updateValidator = [
    isStadiumObjIdValidator
]
const deleteValidator = [
    isStadiumObjIdValidator
]
module.exports = {
    createValidator,
    updateValidator,
    deleteValidator,
};
