const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const { generatorTime } = require('../utils/shared');
const {common} = require('./Common');
const ObjectId = mongoose.Types.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');
const postsBase = {
    title: {
        type: String, trim: true, required: true,
    },
    content: {
        type: String, trim: true, required: true,
    },
    thumbnail: {
        type: String, trim: true, required: true,
    },
    createdAt: {
        type: String, trim: true, default: generatorTime,
    },
    userObjId: {
        type: ObjectId, required: true, ref: 'users', sparse: true,
    },
    tags: [{
        _id: false, type: String, required: true,
    }]
}
const posts = {...postsBase, ...common};
const PostsSchema = new Schema(posts, { versionKey: false });
PostsSchema.plugin(mongoosePaginate);
const PostsModels = mongoose.model('posts', PostsSchema);
module.exports = PostsModels;