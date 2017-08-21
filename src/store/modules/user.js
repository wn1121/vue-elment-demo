import Vue from 'vue';
import router from '../../config/routes'

const user = {
    state: {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        username: localStorage.getItem('userName'),
        avatar: localStorage.getItem('avatar'),
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_UERID: (state, userId) => {
            state.userId = userId;
        },
        SET_USERNAME: (state, username) => {
            state.username = username;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },

    actions: {
        // 获取用户信息
        GetInfo({state}){
            let params = {user_id: state.userId};
            return new Promise((resolve, reject) => {
                Vue.prototype.$api.post(Vue.prototype.$apiUrl.userInfo,params,(res)=>{
                    resolve(res);
                })
            });
        },
        // 退出
        LogOut({commit,state}) {
            let params = {
               user_id: state.userId
           }
            Vue.prototype.$api.post(Vue.prototype.$apiUrl.logout,params,()=>{
                localStorage.clear();
                commit('SET_TOKEN', '');
                commit('SET_UERID', '');
                commit('SET_USERNAME', '');
                commit('SET_AVATAR', '');

                router.push({path: '/passport/login'});
                //location.reload();  // 为了重新实例化vue-router对象 避免bug
            })
        }
    }
};

export default user;
