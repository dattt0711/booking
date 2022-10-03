const {check} = require('express-validator');
const {validateObjectId} = require('../utils/shared');
const isTeamObjIdValidator = validateObjectId('teamObjId', true);
const isPlayerObjIdValidator = validateObjectId('playerObjId', true);
const createValidator = [
    isTeamObjIdValidator,
    check('name').notEmpty().withMessage('name must be required'),
    check('age').notEmpty().withMessage('age must be required'),
    check('position').notEmpty().withMessage('position must be required'),
    check('height').notEmpty().withMessage('height must be required'),
    check('weight').notEmpty().withMessage('weight must be required'),
    check('country').notEmpty().withMessage('country must be required'),
    check('avatar').notEmpty().withMessage('avatar must be required'),
];
const updateValidator = [
    isPlayerObjIdValidator
]
const deleteValidator = [
    isPlayerObjIdValidator
]
module.exports = {
    createValidator,
    updateValidator,
    deleteValidator,
};
