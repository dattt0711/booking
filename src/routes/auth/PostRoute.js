const postsController = require('../../controllers/PostsController').AUTH;
const {
    verifyToken,
} = require('../../utils/common');
function PostsRoute(apiRouter) {
    // Detail
    apiRouter.route('/post/:id').get(postsController.detailPostById);
    // Create a new post
    apiRouter.route('/posts/create').post(verifyToken, postsController.create);
    // Update a post
    apiRouter.route('/posts/update').post(verifyToken ,postsController.update);
    // Delete a post
    apiRouter.route('/posts/delete').delete(verifyToken, postsController.delete);
    // List posts
    apiRouter.route('/posts/list').get(postsController.list);
    // List all distinct tags 
    apiRouter.route('/posts/tags/list').get(postsController.listTags);
}
module.exports = PostsRoute;