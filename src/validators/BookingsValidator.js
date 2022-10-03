const {check} = require('express-validator');
const {validateObjectId, isValidDate} = require('../utils/shared');
const isOwnerObjIdValidator = validateObjectId('ownerObjId', true);
const isStadiumObjIdValidator = validateObjectId('stadiumObjId', true);
const isBookingObjIdValidator = validateObjectId('bookingObjId', true);
const isCompetitorObjIdValidator = validateObjectId('competitorObjId', true);
const ownerBooking = [
    isStadiumObjIdValidator,
    isOwnerObjIdValidator,
    check('rentalTime').notEmpty().withMessage('rentalTime must be required'),
    check('order').notEmpty().withMessage('order must be required'),
    check('dateKeeping').custom(value=>isValidDate(value, 'YYYY-MM-DD')).withMessage('dateKeeping must be format YYYY-MM-DD'),
];
const competitorBooking = [
    isBookingObjIdValidator,
    isCompetitorObjIdValidator,
]
module.exports = {
    ownerBooking,
    competitorBooking,
};
