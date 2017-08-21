const permission = {
    state: {
        routers: JSON.parse(localStorage.getItem('routers')),
        operation: [],
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.routers = routers;
        },
        SET_OPERATION: (state, operation) => {
            state.operation = operation;
        }
    },
    actions: {
        GenerateRoutes({commit}, data) {

        }
    }
};

export default permission;
