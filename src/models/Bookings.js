const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const { RENTAL_TIME, STATUS_BOOKING } = require('../utils/constants');
const {common} = require('./Common');
const bookingsBase = {
    ownerObjId: {
        type: ObjectId, required: true, ref: 'users', sparse: true,
    },
    stadiumObjId: {
        type: ObjectId, required: true, ref: 'stadiums', sparse: true,
    },
    dateKeeping: {
        type: String, trim: true, required: true,
    },
    rentalTime: {
        type: String, enum: RENTAL_TIME,
    },
    order: {
        type: Number, trim: true, required: true,
    },
    competitorObjId: {
        type: ObjectId, ref: 'users', sparse: true,
    },
    password: {
        type: String, trim: true,
    },
    status: {
        type: String, required: true, enum: STATUS_BOOKING, default: STATUS_BOOKING[100],
    },
    createdAt: {
        type: String, required: true,
    }
}
const bookings = {...bookingsBase, ...common};
const BookingsSchema = new Schema(bookings, { versionKey: false });
BookingsSchema.index({
    stadiumObjId: 1, dateKeeping: 1, rentalTime: 1, order: 1, ownerObjId: 1, competitorObjId: 1,
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: 'No' },
    },
});
BookingsSchema.plugin(mongoosePaginate);
const BookingsModels = mongoose.model('bookings', BookingsSchema);
module.exports = BookingsModels;