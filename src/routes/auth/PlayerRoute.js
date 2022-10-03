const playersController = require('../../controllers/PlayersController').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function PlayerRoute(apiRouter) {
    // Create a new player
    apiRouter.route('/players/create').post(verifyToken, playersController.create);
    // Update a player
    apiRouter.route('/players/update').post(verifyToken, playersController.update);
    // Delete a player
    apiRouter.route('/players/delete').delete(verifyToken, playersController.delete);
    // List players
    apiRouter.route('/players/list').get(playersController.list);
}
module.exports = PlayerRoute;