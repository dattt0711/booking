require('dotenv').config()
const UsersService = require('../services/UsersService');
const TeamsService = require('../services/TeamsService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configJwt = require('../configs/configJWT');
const moment = require('moment-timezone');
const {CODES_SUCCESS} = require('../utils/messages')
const {
    responseError,
    validateResult,
    isEmpty,
} = require('../utils/shared');
const {registerValidator, loginValidator} = require('../validators/UsersValidator');
module.exports.DEFAULT = {
    register: async (req, res) => {
        try {
            const errors = await validateResult(registerValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {username, password, fullName, age, phoneNumber, email, role, teamName, level} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UsersService.create({
                username,
                password: hashedPassword,
                fullName,
                age,
                phoneNumber,
                email,
                role,
            })
            // If user register successfully, create team belongs with this user
            if(result) {
                await TeamsService.create({
                    name: teamName,
                    managerObjId: result._id,
                    level: level,
                });
            }
            const accessToken = jwt.sign({
                username: username,
                fullName: fullName,
                email: email,
                userObjId: result._id,
            },
            configJwt.secret,
            // {expiresIn: configJwt.expires}
            )
            const decoded = jwt.verify(accessToken, configJwt.secret);
            // const expiresDate = moment(decoded.exp * 1000).format('YYYY-MM-DD HH:mm:ss');
            const paramsExpires = {};
            paramsExpires.userObjId = result._id;
            // paramsExpires.expiresDate = expiresDate;
            // await UsersService.updateExpiresDate(paramsExpires);
            delete result._doc.password;
            return res.json({
                success: true,
                accessToken: accessToken,
                statusCode: 10000,
                message: CODES_SUCCESS[10000],
                data: result,
            });
        } catch (err) {
            console.log(err,'err')
            return res.json(err);
        }
    },
   login: async(req,res)=>{
        try{
            const errors = await validateResult(loginValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {username, password} = req.body;
            // Check for existing user
            const user = await UsersService.findByConditions({username})
            if(!user) 
            return res.json(responseError(40001, errors));
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword)   return res.json(responseError(40001, errors));
    
            // Return token
            const accessToken = jwt.sign({
                username: user.username,
                fullName: user.fullName,
                email: user.email,
                userObjId: user._id,
            },
            configJwt.secret,
            // {expiresIn: configJwt.expires}
            )
            const decoded = jwt.verify(accessToken, configJwt.secret);
            // const expiresDate = moment(decoded.exp * 1000).format('YYYY-MM-DD HH:mm:ss');
            // const paramsExpires = {};
            // paramsExpires.userObjId = user._id;
            // paramsExpires.expiresDate = expiresDate;
            // await UsersService.updateExpiresDate(paramsExpires);
            delete user._doc.password;
            return res.json({
                success: true,
                accessToken: accessToken,
                statusCode: 10001,
                message: CODES_SUCCESS[10001],
                data: user,
            });
        }catch(err){
            console.log(err,'err')
            return res.json(err);
        }
    }
}