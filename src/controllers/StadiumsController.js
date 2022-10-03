const stadiumsService = require('../services/StadiumsService');
const bookingsService = require('../services/BookingsService');
const {
    isEmpty, responseSuccess, responseError,
    validateResult,
} = require('../utils/shared')
const {
    listValidator
} = require('../validators/CommonValidator');
const {
    createValidator, updateValidator, deleteValidator
} = require('../validators/StadiumsValidator');
module.exports.AUTH = {
    create: async (req,res) => {
        try {
            const errors = await validateResult(createValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {name, address, rentalTime, order, image} = req.body;
            const newStadium = await stadiumsService.create({
                name,
                address,
                rentalTime,
                order,
                image,
            })
            if(!isEmpty(newStadium)) {
                return res.json(responseSuccess(10220, newStadium));
            }
            return res.json(responseError(40120, []));
        } catch (err) {
            console.log(err,'err')
            return res.json(responseError(40004,err)); 
        }
    },
    list: async (req,res) => {
        try {
            const errors = await validateResult(listValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
           const result = await stadiumsService.list({
            ...req.query,
           })      
           if(!isEmpty(result)) {
            return res.json(responseSuccess(10223, result));
        }
        return res.json(responseSuccess(10223, []));
        } catch(err){
            return res.json(responseError(40004,err));
        }
    },
    update: async (req,res) => {
        try {
            const errors = await validateResult(updateValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {name, address, rentalTime, order, stadiumObjId, image} = req.body;
            const findStadium = await stadiumsService.findByConditions({
                stadiumObjId,
            })
            if(isEmpty(findStadium)) {
                return res.json(responseError(40123, []));
            }
            const result = await stadiumsService.update({
                name,
                address,
                order,
                rentalTime,
                stadiumObjId,
                image,
            })
            if(!isEmpty(result)) {
                return res.json(responseSuccess(10221, result));
            }
            return res.json(responseError(40111, []));
        } catch (err) {
            console.log(err,'err')
            return res.json(responseError(40004,err));
        }
    },
    delete: async (req,res) => {
        try {
            const errors = await validateResult(deleteValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {stadiumObjId} = req.body;
            const findStadium = await stadiumsService.findByConditions({
                stadiumObjId,
            })
            if(isEmpty(findStadium)) {
                return res.json(responseError(40123, []));
            }
            const result = await stadiumsService.updateDelete({
                stadiumObjId,
            })
            if(!isEmpty(result)) {
                return res.json(responseSuccess(10222, result));
            }
            return res.json(responseError(40122, []));
        } catch (err) {
            return res.json(responseError(40004,err));
        }
    },
    checkAvailable: async (req,res) => {
        try {
            const {stadiumObjId, order, dateKeeping , rentalTime } = req.query;
            const findBooking = await bookingsService.findByConditions({
                stadiumObjId,
                order,
                dateKeeping,
                rentalTime,
            });
            if(isEmpty(findBooking)) {
                return res.json(responseError(40131, []));
            }
            return res.json(responseSuccess(10233, findBooking));
        } catch (err) {
            return res.json(responseError(40004,err));
        }
    }
}