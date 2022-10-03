const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const {common} = require('./Common');
const {POSITION_PLAYER} = require('../utils/constants');
const playersBase = {
    name: {
        type: String, trim: true, required: true,
    },
    age: {
        type: Number, trim: true, required: true, 
    },
    position: {
        type: String, enum: POSITION_PLAYER, required: true, 
    },
    height: {
        type: Number, trim: true, required: true,
    },
    weight: {
        type: Number, trim: true, required: true,
    },
    country: {
        type: String, trim: true, required: true,
    },
    teamObjId: {
        type: ObjectId, required: true, ref: 'teams', sparse: true,
    },
    avatar: {
        type: String, required: true
    }
}
const players = {...playersBase, ...common};
const PlayersSchema = new Schema(players, { versionKey: false });
PlayersSchema.plugin(mongoosePaginate);
const PlayersModels = mongoose.model('players', PlayersSchema);
module.exports = PlayersModels;