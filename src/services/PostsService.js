const {
    posts: PostsModels,
} = require('../models/utils/connectToModels');
const {
    promiseResolve, generatorTime, convertToObjectId, promiseReject,
    populateModel, isEmpty, regExpSearch,
} = require('../utils/shared');
const {IS_DELETED, DEFAULT_PAGE, DEFAULT_LIMIT} = require('../utils/constants');
const list = async (data) => {
    try {
        const title = data.title ? data.title : '';
        const page = data.page ? data.page : DEFAULT_PAGE;
        const limit = data.limit ? data.limit : DEFAULT_LIMIT;
        const sortKey = data.sortKey ? data.sortKey : 'title';
        const sortOrder = data.sortOrder ? data.sortOrder : 1;
        const conditions = {
            isDeleted: IS_DELETED[200],
        };
        if(title) {
            const regex = regExpSearch(title);
            conditions.title = regex;
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
            populateModel('userObjId','-password -expiresDate'),
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
        const result = PostsModels.paginate(conditions, options);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
}
const create = async (data) => {
    try {
        const set = {};
        set.userObjId = convertToObjectId(data.userObjId);
        set.title = data.title;
        set.createdAt = generatorTime();
        set.content = data.content;
        set.thumbnail = data.thumbnail;
        set.tags = data.tags;
        set.isDeleted = IS_DELETED[200];
        const result = await PostsModels.create(set);
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
            _id: convertToObjectId(data.postId),
        };
        if (data?.title) {
            set.title = data.title;
        }
        if (data?.content) {
            set.content = data.content;
        }
        if (data?.tags) {
            set.tags = data.tags;
        }
        if (data?.thumbnail) {
            set.thumbnail = data.thumbnail;
        }
        const result = await PostsModels.findOneAndUpdate(conditions, set, {new: true});
        return promiseResolve(result);
    } catch (err) {
        console.log(err, 'err');
        return promiseReject(err);
    }
};
const findByConditions = async (data) => {
    try {
        const conditions = {};
        if (data?.postId) {
            conditions._id = convertToObjectId(data.postId);
        }
        if (!isEmpty(data?.userObjId)) {
            conditions.userObjId = {$in: convertToArrayObjectId(data.userObjId)};
        }
        conditions.isDeleted = IS_DELETED[200];
        const populate = [
            populateModel('userObjId','-password -expiresDate'),
        ];
        if (data?.getAll) {
            const result = await PostsModels.find(conditions).populate(populate);
            return promiseResolve(result);
        }
        const result = await PostsModels.findOne(conditions).populate(populate);
        return promiseResolve(result);
    } catch (err) {
        console.log(err,'err')
        return promiseReject(err);
    }
};
const deleteConditions = async (data) => {
    try {
        const conditions = {};
        if(data?.postId) {
            conditions._id = convertToObjectId(data.postId);
        }
        if(data?.userObjId) {
            conditions.userObjId = convertToObjectId(data.userObjId);
        }
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await PostsModels.updateMany(conditions, set);
        return promiseResolve(result);
    } catch (err) {
        return promiseReject(err);
    }
};
const updateDelete = async (data) => {
    try {
        const conditions = {};
        if(data?.postId) {
            conditions._id = convertToObjectId(data.postId);
        }
        if(data?.userObjId) {
            conditions.userObjId = convertToObjectId(data.userObjId);
        }
        const set = {
            isDeleted: IS_DELETED[300],
        };
        const result = await PostsModels.findOneAndUpdate(conditions, set, {new: true});
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
