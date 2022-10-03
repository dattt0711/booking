const playersService = require('../services/PlayersService');
const {
    isEmpty, responseSuccess, responseError,
    validateResult,
} = require('../utils/shared')
const {
    listValidator
} = require('../validators/CommonValidator');
const {
    createValidator, updateValidator, deleteValidator,
} = require('../validators/PlayersValidator');
module.exports.AUTH = {
    list: async (req,res) => {
        try {
            const errors = await validateResult(listValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
           const result = await playersService.list({
            ...req.query,
           })      
           if(!isEmpty(result)) {
            return res.json(responseSuccess(10213, result));
        }
        return res.json(responseSuccess(10213, []));
        } catch(err){
            return res.json(responseError(40004,err));
        }
    },
    create: async (req,res) => {
        try {
            const errors = await validateResult(createValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {teamObjId, name, age, position, height,
                weight, country, avatar} = req.body;
            const newPlayer = await playersService.create({
                teamObjId,
                name,
                age,
                position,
                height,
                weight,
                country,
                avatar,
            })
            if(!isEmpty(newPlayer)) {
                return res.json(responseSuccess(10210, newPlayer));
            }
            return res.json(responseError(40110, []));
        } catch (err) {
            console.log(err,'err')
            return res.json(responseError(40004,err)); 
        }
    },
    update: async (req,res) => {
        try {
            const errors = await validateResult(updateValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {name, age, position, height, weight, country, playerObjId, avatar} = req.body;
            const findPlayer = await playersService.findByConditions({
                playerObjId,
            })
            if(isEmpty(findPlayer)) {
                return res.json(responseError(40113, []));
            }
            const result = await playersService.update({
                playerObjId,
                name,
                age,
                position,
                height,
                weight,
                country,
                avatar,
            })
            if(!isEmpty(result)) {
                return res.json(responseSuccess(10211, result));
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
            const {playerObjId} = req.body;
            const findPlayer = await playersService.findByConditions({
                playerObjId,
            })
            if(isEmpty(findPlayer)) {
                return res.json(responseError(40113, []));
            }
            const result = await playersService.updateDelete({
                playerObjId,
            })
            if(!isEmpty(result)) {
                return res.json(responseSuccess(10212, result));
            }
            return res.json(responseError(40112, []));
        } catch (err) {
            return res.json(responseError(40004,err));
        }
    }
}