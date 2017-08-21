const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    userId: state => state.user.userId,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    roles: state => state.user.roles,
    //permission_routers: state => state.permission.routers,
    routers: state => state.permission.routers,
    operation: state => state.permission.operation
};
export default getters
