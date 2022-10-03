const {check} = require('express-validator');
const {validateObjectId} = require('../utils/shared');
const isUserObjIdValidator = validateObjectId('userObjId', true);
const isPostObjIdValidator = validateObjectId('postId', true);
const createValidator = [
    isUserObjIdValidator,
    check('title').notEmpty().withMessage('title must be required'),
    check('content').notEmpty().withMessage('content must be required'),
    check('thumbnail').notEmpty().withMessage('thumbnail must be required'),
];
const updateValidator = [
    isPostObjIdValidator
]
const deleteValidator = [
    isPostObjIdValidator
]
module.exports = {
    createValidator,
    updateValidator,
    deleteValidator,
}