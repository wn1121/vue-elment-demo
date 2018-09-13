const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    userId: state => state.user.userId,
    roleId: state => state.user.roleId,
    cityId: state => state.user.cityId,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    roles: state => state.user.roles,
    //permission_routers: state => state.permission.routers,
    menus: state => state.permission.menus,
    routers: state => state.permission.routers,
    operation: state => state.permission.operation,
    activeIndex: state => state.permission.activeIndex,
    listPagePars: state=> state.searchcondition.listPagePars
};
export default getters
