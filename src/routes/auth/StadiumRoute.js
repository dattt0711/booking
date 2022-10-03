const stadiumsController = require('../../controllers/StadiumsController').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function StadiumRoute(apiRouter) {
    // Create a new stadiums
    apiRouter.route('/stadiums/create').post(verifyToken, stadiumsController.create);
    // Update a player
    apiRouter.route('/stadiums/update').put(verifyToken, stadiumsController.update);
    // Delete a player
    apiRouter.route('/stadiums/delete').delete(verifyToken, stadiumsController.delete);
    // List stadiums
    apiRouter.route('/stadiums/list').get(stadiumsController.list);
    // Check available booking
    apiRouter.route('/stadiums/checkAvailable').get(stadiumsController.checkAvailable);
}
module.exports = StadiumRoute;