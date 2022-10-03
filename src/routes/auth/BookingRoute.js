const bookingsController = require('../../controllers/BookingsController.js').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function BookingRoute(apiRouter) {
    // Owner book stadiums
    apiRouter.route('/bookings/ownerBook').post(bookingsController.ownerBook);
    // Competitor book stadiums
    apiRouter.route('/bookings/competitorBook').post(bookingsController.competitorBook);
    // List bookings
    apiRouter.route('/bookings/list').get(verifyToken, bookingsController.list);
}
module.exports = BookingRoute;