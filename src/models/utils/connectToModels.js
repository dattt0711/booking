

const { connectDatabase } = require('../../utils/shared');

const UsersSchema = require('../Users');
const BookingsSchema = require('../Bookings');
const PlayersSchema = require('../Players');
const PostsSchema = require('../Posts');
const StadiumsSchema = require('../Stadiums');
const TeamsSchema = require('../Teams');
const models = {};

module.exports = {
    users: UsersSchema,
    bookings: BookingsSchema,
    players: PlayersSchema,
    posts: PostsSchema,
    stadiums: StadiumsSchema,
    teams: TeamsSchema,
 

    connectToModels: ({databaseName, currentModels = [], otherModels = []}) => {
        const conn = connectDatabase(databaseName);
        otherModels.map((model) => {
            conn.model(model, models[model]);
        });
        const objCurrentModels = currentModels.reduce((initObj, currModel) => {
            initObj[currModel] = conn && conn.model ? conn.model(currModel, models[currModel]) : null;
            return initObj;
        }, {});
        objCurrentModels.connectToModel = (model) => {
            conn.model(model, models[model]);
        };
        return objCurrentModels;
    },
};
