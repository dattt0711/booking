
const usersController = require('../../controllers/UsersController').DEFAULT;

function loginRoute(apiRouter) {
    apiRouter.route('/register').post(usersController.register);
    apiRouter.route('/login').post(usersController.login);
}
module.exports = loginRoute;
