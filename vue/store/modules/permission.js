const permission = {
    state: {
        menus: JSON.parse(localStorage.getItem('menus')),
        routers: JSON.parse(localStorage.getItem('routers')),
        activeIndex: localStorage.getItem('activeIndex'),
        operation: JSON.parse(localStorage.getItem('operation')),
    },
    mutations: {
        SET_MENUS: (state, menus) => {
            state.menus = menus;
        },
        SET_ROUTERS: (state, routers) => {
            state.routers = routers;
        },
        SET_OPERATION: (state, operation) => {
            state.operation = operation;
        },
        SET_ACTIVEINDEX: (state, activeIndex) => {
            state.activeIndex = activeIndex;
        }
    },
    actions: {
        GenerateRoutes({commit}, data) {

        }
    }
};

export default permission;
