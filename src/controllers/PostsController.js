const postsService = require('../services/PostsService');
const {
    isEmpty, responseSuccess, responseError,
    validateResult,
} = require('../utils/shared')
const {
    listValidator
} = require('../validators/CommonValidator')
const {
    createValidator, updateValidator, deleteValidator,
} = require('../validators/PostsValidator')
module.exports.AUTH = {
    detailPostById: async (req,res) => {
        try {
            const {id} = req.params
            const result = await postsService.findByConditions({
                postId: id,
            })
            if(!isEmpty(result)) {
                return res.json(responseSuccess(10204, result));
            }
            return res.json(responseSuccess(10204, []));
        } catch (err) {
            return res.json(responseError(40004,err));
        }
    },
    list: async (req,res) => {
        try {
            const errors = await validateResult(listValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
           const result = await postsService.list({
            ...req.query,
           })      
           if(!isEmpty(result)) {
            return res.json(responseSuccess(10203, result));
        }
        return res.json(responseSuccess(10203, []));
        } catch(err){
            return res.json(responseError(40004,err));
        }
    },
    listTags: async (req,res) => {
        try {
            const listPosts = await postsService.findByConditions({
                getAll: true,
            })
            function filterDistinct(value, index, self) {
                return self.indexOf(value) === index;
            }
            let allTags = listPosts.reduce((prev,curr)=>prev.concat(curr.tags),[]);
            allTags = allTags.filter(filterDistinct);
            return res.json(responseSuccess(10205, allTags));
        } catch (err) {
            return res.json(responseError(40004,err));
        }
    },
    create: async (req,res) => {
        try {
            const errors = await validateResult(createValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {userObjId, title, content, thumbnail, tags} = req.body;
            const newPost = await postsService.create({
                userObjId: userObjId,
                title,
                content,
                thumbnail,
                tags,
            })
            if(!isEmpty(newPost)) {
                return res.json(responseSuccess(10200, newPost));
            }
            return res.json(responseError(40100, []));
        } catch (err) {
            return res.json(responseError(40004,err));
        }
    },
    update: async (req,res) => {
        try {
            const errors = await validateResult(updateValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {title, content, postId, tags, thumbnail} = req.body;
            const findPost = await postsService.findByConditions({
                postId,
            })
            if(isEmpty(findPost)) {
                return res.json(responseError(40103, []));
            }
            const result = await postsService.update({
                postId,
                title,
                content,
                tags,
                thumbnail,
            })
            if(!isEmpty(result)) {
                return res.json(responseSuccess(10201, result));
            }
            return res.json(responseError(40101, []));
        } catch (err) {
            return res.json(responseError(40004,err));
        }
    },
    delete: async (req,res) => {
        try {
            const errors = await validateResult(deleteValidator, req);
            if (!isEmpty(errors)) {
                return res.json(responseError(40003, errors));
            }
            const {postId} = req.body;
            const findPost = await postsService.findByConditions({
                postId,
            })
            if(isEmpty(findPost)) {
                return res.json(responseError(40103, []));
            }
            const result = await postsService.updateDelete({
                postId,
            })
            if(!isEmpty(result)) {
                return res.json(responseSuccess(10202, result));
            }
            return res.json(responseError(40102, []));
        } catch (err) {
            return res.json(responseError(40004,err));
        }
    }
}