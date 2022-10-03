const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const { RENTAL_TIME } = require('../utils/constants');
const {common} = require('./Common');
const stadiumsBase = {
    name: {
        type: String, trim: true, required: true,
    },
    address: {
        type: String, trim: true, required: true,
    },
    rentalTime: [{
      type: String, enum: RENTAL_TIME, required: true, default: RENTAL_TIME[600], _id: false
    }],
    order: [{
        type: Number, trim: true, required: true, _id: false
    }],
    image: {
        type: String, require: true,
    }
}
const stadiums = {...stadiumsBase, ...common};
const StadiumsSchema = new Schema(stadiums, { versionKey: false });
StadiumsSchema.index({
    name: 1, address: 1
}, {
    unique: true,
    partialFilterExpression: {
        isDeleted: { $eq: 'No' },
    },
});
StadiumsSchema.plugin(mongoosePaginate);
const StadiumsModels = mongoose.model('stadiums', StadiumsSchema);
module.exports = StadiumsModels;