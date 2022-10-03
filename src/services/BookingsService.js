const {
    bookings: BookingsModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, convertToObjectId, promiseReject, isEmpty, generatorTime, populateModel,
} = require('../utils/shared');

const {IS_DELETED, DEFAULT_PAGE, DEFAULT_LIMIT, STATUS_BOOKING} = require('../utils/constants');
const list = async (data) => {
    try {
        const page = data.page ? data.page : DEFAULT_PAGE;
        const limit = data.limit ? data.limit : DEFAULT_LIMIT;
        const sortKey = data.sortKey ? data.sortKey : 'createdAt';
        const sortOrder = data.sortOrder ? data.sortOrder : 1;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if(data?.status) {
            conditions.status = data.status;
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
            populateModel('ownerObjId', '-password -phoneNumber -address -email -expiresDate'),
            populateModel('stadiumObjId'),
            populateModel('competitorObjId', '-password -phoneNumber -address -email -expiresDate'),
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
        const result = BookingsModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const create = async (data) => {
    try {
        const set = {};
        set.ownerObjId = convertToObjectId(data.ownerObjId);
        set.stadiumObjId = convertToObjectId(data.stadiumObjId);
        set.dateKeeping = data.dateKeeping;
        set.rentalTime = data.rentalTime;
        set.order = data.order;
        if(data?.password) {
            set.password = data?.password;
        }
        set.createdAt = generatorTime();
        set.isDeleted = IS_DELETED[200];
        set.status = STATUS_BOOKING[100];
        const result = await BookingsModels.create(set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {};
        if(data?.bookingObjId) {
            conditions._id = convertToObjectId(data.bookingObjId);
        }
        if(data?.rentalTime) {
            conditions.rentalTime = data.rentalTime;
        }
        if(data?.order) {
            conditions.order = data.order;
        }
        if(data?.dateKeeping) {
            conditions.dateKeeping = data.dateKeeping;
        }
        if(data?.stadiumObjId) {
            conditions.stadiumObjId = convertToObjectId(data.stadiumObjId);
        }
        if(isEmpty(conditions)) {
            return promiseResolve([]);
        }
        if(data?.getAll) {
            const result = await BookingsModels.find(conditions);
            return promiseResolve(result);
        }
        const result = await BookingsModels.findOne(conditions);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}
const update = async (data) => {
    try {
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        const set = {};
        if(data?.bookingObjId) {
            conditions.bookingObjId = data.bookingObjId;
        }
        if(data?.competitorObjId) {
            set.competitorObjId = data.competitorObjId;
        }
        set.status = STATUS_BOOKING[200];
        const result = await BookingsModels.findOneAndUpdate(conditions,set,{new: true});
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}
module.exports = {
    create,
    findByConditions,
    update,
    list,
};