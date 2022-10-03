const {
    teams: TeamsModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, generatorTime, convertToObjectId, promiseReject,
    populateModel,
} = require('../utils/shared');
const {IS_DELETED} = require('../utils/constants');
const create = async (data) => {
    try {
        const set = {};
        set.name = data.name;
        set.managerObjId = convertToObjectId(data.managerObjId);
        set.level = data.level;
        set.isDeleted = IS_DELETED[200];
        const result = await TeamsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};

module.exports = {
    create,
};
