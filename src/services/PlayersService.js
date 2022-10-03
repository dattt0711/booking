const {
    players: PlayersModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, generatorTime, convertToObjectId, promiseReject,
    populateModel, isEmpty, regExpSearch,
} = require('../utils/shared');
const {IS_DELETED, DEFAULT_PAGE, DEFAULT_LIMIT} = require('../utils/constants');
const list = async (data) => {
    try {
        const name = data.name ? data.name : '';
        const page = data.page ? data.page : DEFAULT_PAGE;
        const limit = data.limit ? data.limit : DEFAULT_LIMIT;
        const sortKey = data.sortKey ? data.sortKey : 'name';
        const sortOrder = data.sortOrder ? data.sortOrder : 1;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if(name) {
            const regex = regExpSearch(name);
            conditions.name = regex;
        }
        const myCustomLabels = {
            totalDocs: 'itemCount',
            docs: 'items',
            limit: 'limit',
            page: 'currentPage',
            nextPage: 'nextPage',
            prevPage: 'prevPage',
            totalPages: 'pageCount',
            pagingCounter: 'pagingCounter',
            meta: 'paginator',
        };
        const fields = '-order -isDeleted';
        const populate = [
            populateModel('teamObjId'),
        ];
        const options = {
            sort: {
                [sortKey]: sortOrder,
            },
            page: page,
            limit: limit,
            lean: true,
            populate,
            select: fields,
            customLabels: myCustomLabels,
        };
        const result = PlayersModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}
const create = async (data) => {
    try {
        const set = {};
        set.teamObjId = convertToObjectId(data.teamObjId);
        set.name = data.name;
        set.age = data.age;
        set.position = data.position;
        set.height = data.height;
        set.weight = data.weight;
        set.country = data.country;
        set.avatar = data.avatar;
        set.isDeleted = IS_DELETED[200];
        const result = await PlayersModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const update = async (data) => {
    try {
        const set = {};
        const conditions = {
            isDeleted: IS_DELETED[200],
            _id: convertToObjectId(data.playerObjId),
        };
        if (data?.name) {
            set.name = data.name;
        }
        if (data?.age) {
            set.age = data.age;
        }
        if (data?.position) {
            set.position = data.position;
        }
        if (data?.height) {
            set.height = data.height;
        }
        if (data?.weight) {
            set.weight = data.weight;
        }
        if (data?.country) {
            set.country = data.country;
        }
        if (data?.avatar) {
            set.avatar = data.avatar;
        }
        const result = await PlayersModels.findOneAndUpdate(conditions, set, {new: true});
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err');
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {};
        if (data?.playerObjId) {
            conditions._id = convertToObjectId(data.playerObjId);
        }
        if (!isEmpty(data?.teamObjId)) {
            conditions.teamObjId = {$in: convertToArrayObjectId(data.teamObjId)};
        }
        conditions.isDeleted = IS_DELETED[200];
        const populate = [
            populateModel('teamObjId'),
        ];
        if (data?.getAll) {
            const result = await PlayersModels.find(conditions).populate(populate);
            return promiseResolve(result);
        }
        const result = await PlayersModels.findOne(conditions).populate(populate);
        return promiseResolve(result);
    } catch (err) {
        console.log(err,'err')
        return promiseReject(err);
    }
};
const deleteConditions = async (data) => {
    try {
        const conditions = {};
        if(data?.playerObjId) {
            conditions._id = convertToObjectId(data.playerObjId);
        }
        if(data?.teamObjId) {
            conditions.teamObjId = convertToObjectId(data.teamObjId);
        }
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await PlayersModels.updateMany(conditions, set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {};
        if(data?.playerObjId) {
            conditions._id = convertToObjectId(data.playerObjId);
        }
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await PlayersModels.findOneAndUpdate(conditions, set, {new: true});
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
module.exports = {
    create,
    update,
    findByConditions,
    deleteConditions,
    updateDelete,
    list,
};
