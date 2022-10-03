const {check} = require('express-validator');
const pageValidator = check('page').optional().isNumeric().withMessage('Page is number');
const limitValidator = check('limit').optional().isNumeric().withMessage('Limit is number');
const sortKeyValidator = check('sortKey').optional().isString().withMessage('sortKey is string');
const sortOrderValidator = check('sortOrder').optional().isNumeric().withMessage('sortOrder is number');

const paginate = [
    pageValidator,
    limitValidator,
    sortKeyValidator,
    sortOrderValidator,
];
const listValidator = [
    ...paginate,
]
module.exports = {
    listValidator,
}