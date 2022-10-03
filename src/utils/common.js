const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const {generatorTime, responseError} = require('./shared');
const configJwt = require('../configs/configJWT');
const UsersService = require('../services/UsersService');
module.exports = {
verifyToken: async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'] || req.body.token || req.query.token;
        if (!token) {
            return res.json(responseError(40001));
        }
        jwt.verify(token, configJwt.secret, async (err, decoded) => {
            if (err) {
                return res.json(responseError(40002));
            }
            return next();
            // req.decoded = {
            //     ...decoded,
            // };
            // const format = 'YYYY-MM-DD';

            // const userObjId = decoded.userObjId; 
            // const resUser = await UsersService.findByConditions({ userObjId: userObjId });
            // const expiresDate = moment(decoded.exp * 1000).format(format);
            // const expiresDateAccount = resUser && resUser.expiresDate && resUser.expiresDate !== ''
            //     ? resUser.expiresDate : generatorTime();
            // const beforeTime = moment(expiresDate, format);
            // const afterTime = moment(expiresDateAccount, format);
            // if (beforeTime.isSame(afterTime)) {
            //     return next();
            // }
            // // Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại!
            // return res.json(responseError(40002));
        });
    } catch (errors) {
        if (errors.name === 'JsonWebTokenError') {
            return res.json(responseError(40002,errors));
        }
        return res.json(responseError(40002,errors));
    }
},
}