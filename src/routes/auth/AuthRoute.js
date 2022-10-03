
const express = require('express');

const authRouter = express.Router();
const {
    verifyToken,
} = require('../../utils/common.js');

// authRouter.use(async (req, res, next) => {
//     await verifyToken(req, res, next);
// });
// require('./usersRoute')(authRouter);
require('./PostRoute')(authRouter);
require('./PlayerRoute')(authRouter);
require('./StadiumRoute')(authRouter);
require('./BookingRoute')(authRouter);

module.exports = authRouter;
