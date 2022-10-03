
function usersRoute(apiRouter) {
    apiRouter.route('/test').get((req,res)=>{
        return res.json('hello')
    })
}

module.exports = usersRoute;
