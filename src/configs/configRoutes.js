
const authRouter = require('../routes/auth/AuthRoute.js');
const defaultRouter = require('../routes/default/DefaultRoute.js');

module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use('/', defaultRouter);
};
