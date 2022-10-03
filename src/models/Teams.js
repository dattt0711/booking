const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { LEVEL_TEAM } = require('../utils/constants');
const { generatorTime } = require('../utils/shared');
const ObjectId = mongoose.Types.ObjectId;
const {common} = require('./Common');
const teamsBase = {
    name: {
        type: String, trim: true, required: true,
    },
    managerObjId: {
        type: ObjectId, required: true, ref: 'users', sparse: true,
    },
    level: {
        type: String, enum: LEVEL_TEAM, default: LEVEL_TEAM[200],
    }
}
const teams = {...teamsBase, ...common};
const TeamsSchema = new Schema(teams, { versionKey: false });
const TeamsModels = mongoose.model('teams', TeamsSchema);
module.exports = TeamsModels;