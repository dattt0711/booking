const bookingsService = require('../services/BookingsService');
const {
    isEmpty, responseSuccess, responseError,
    validateResult,
} = require('../utils/shared');
const {STATUS_BOOKING} = require('../utils/constants');
const {ownerBooking, competitorBooking} = require('../validators/BookingsValidator');
const {listValidator} = require('../validators/CommonValidator');
module.exports.AUTH = {
    ownerBook: async (req,res) => {
        try {
            const errors = await validateResult(ownerBooking, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {ownerObjId, stadiumObjId, dateKeeping, rentalTime, order, password} = req.body;
            let hashedPassword = null;
            if(!isEmpty(password)) {
                hashedPassword = await bcrypt.hash(password, 10);
            }
            const newBooking = await bookingsService.create({
                ownerObjId,
                stadiumObjId,
                dateKeeping,
                rentalTime,
                order,
                password: hashedPassword,
            })
            if(!isEmpty(newBooking)) {
                return res.json(responseSuccess(10230, newBooking));
            }
            return res.json(responseError(40130, []));
        } catch (err) {
            console.log(err,'err')
            return res.json(responseError(40004,err)); 
        }
    },
    competitorBook: async (req,res) => {
        try {
            const errors = await validateResult(competitorBooking, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {bookingObjId, competitorObjId, password} = req.body;
            const findBooking = await bookingsService.findByConditions({
                bookingObjId,
            })
            if(isEmpty(findBooking)) {
                return res.json(responseError(40131, []));
            }
            if(findBooking?.status !== STATUS_BOOKING[100]) {
                return res.json(responseError(40132, findBooking));
            }
            if(findBooking?.password) {
                const validPassword = await bcrypt.compare(password, findBooking.password);
                if(!validPassword)   return res.json(responseError(40133, errors));
            }
            const result = await bookingsService.update({
                bookingObjId,
                competitorObjId,
            })
            return res.json(responseSuccess(10231, result));
        } catch (err) {
            console.log(err,'err')
            return res.json(responseError(40004,err)); 
        }
    },
    list: async(req,res) => {
        try {
            const errors = await validateResult(listValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const result = await bookingsService.list({
                ...req.query,
               })      
               if(!isEmpty(result)) {
                return res.json(responseSuccess(10232, result));
            }
            return res.json(responseSuccess(10232, []));
        } catch (err) {
            return res.json(responseError(40004,err));  
        }
    }
}