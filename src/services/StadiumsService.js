const {
    stadiums: StadiumsModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, convertToObjectId, promiseReject, isEmpty,
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
        const fields = '-isDeleted';
        const options = {
            sort: {
                [sortKey]: sortOrder,
            },
            page: page,
            limit: limit,
            lean: true,
            // populate,
            select: fields,
            customLabels: myCustomLabels,
        };
        const result = StadiumsModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const create = async (data) => {
    try {
        const set = {};
        set.name = data.name;
        set.address = data.address;
        set.rentalTime = data.rentalTime;
        set.order = data.order;
        set.image = data.image;
        set.isDeleted = IS_DELETED[200];
        const result = await StadiumsModels.create(set);
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
            _id: convertToObjectId(data.stadiumObjId),
        };
        if (data?.name) {
            set.name = data.name;
        }
        if (data?.address) {
            set.address = data.address;
        }
        if (data?.rentalTime) {
            set.rentalTime = data.rentalTime;
        }
        if (data?.order) {
            set.order = data.order;
        }
        if (data?.image) {
            set.image = data.image;
        }
        const result = await StadiumsModels.findOneAndUpdate(conditions, set, {new: true});
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err');
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {};
        if (data?._id) {
            conditions._id = convertToObjectId(data._id);
        }
        if (!isEmpty(data?.name)) {
            conditions.userObjId = data.name;
        }
        if (!isEmpty(data?.rentalTime)) {
            conditions.rentalTime = data.rentalTime;
        }
        if (!isEmpty(data?.address)) {
            conditions.address = data.address;
        }
        if (!isEmpty(data?.order)) {
            conditions.order = data.order;
        }
        conditions.isDeleted = IS_DELETED[200];
        if (data?.getAll) {
            const result = await StadiumsModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await StadiumsModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const deleteConditions = async (data) => {
    try {
        const conditions = {};
        if(data?._id) {
            conditions._id = convertToObjectId(data._id);
        }
        if(data?.name) {
            conditions.name = data.name;
        }
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await StadiumsModels.updateMany(conditions, set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {};
        if(data?.stadiumObjId) {
            conditions._id = convertToObjectId(data.stadiumObjId);
        }
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await StadiumsModels.findOneAndUpdate(conditions, set, {new: true});
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
    list,
    updateDelete,
};
