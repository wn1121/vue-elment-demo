/**
 * @author wangna
 * @date 17/07/20
 */
import request from 'superagent';
import Utils from './utils';
import router from '../config/routes'
import store from '../store/index'
import host from 'Host';
import { Message } from 'element-ui';

//本地测试 解决跨域问题 目前java接口暂不支持跨域
// const root = '/proxy';
const root = host.domain;
const sroot = host.sDomain;
const proot = host.pDomain;

function apiBase(method, url, params, success, failure) {
    var r = request(method, url).type('application/json');
    if (params) {
        params.token = localStorage.getItem('token');
        params = Utils.filterNull(params);//空字符串过滤
        if (method === 'POST' || method === 'PUT') {
            if (Utils.toType(params) == 'object') {
                params = JSON.stringify(params);
            }
            r = r.send(params)
        } else if (method == 'GET' || method === 'DELETE') {
            r = r.query(params)
        }
    }
    r.end(function (err, res) {
        if (err) {
            Message({
                message: 'api error',
                type: 'warning'
            });
            return;
        };
        if (res.body.code == 0) {
            if (success) {
                success(res.body);
            }
        } else if(res.body.code == -1000){
            //token失效
            Message({
                message: res.body.msg,
                type: 'warning'
            });
            // store.dispatch('LogOut');
            localStorage.clear();
            store.commit('SET_UERID','');
            setTimeout(()=>{
                    router.push({path: '/passport/login'});
            },1000)
        }  else {
            if (failure) {
                failure(res.body);
            } else {
                //alert('error: ' + JSON.stringify(res.body));
                Message({
                    message: res.body.msg || '接口出错',
                    type: 'warning'
                });
            }
        }
    });
}

function apiPhpBase(method, url, params, success, failure) {
    var r = request(method, url);
    if (params) {
        params.token = localStorage.getItem('token');
        if(!params.operator_id) params.operator_id = store.getters.userId;
        if(!params.operator_name) params.operator_name = store.getters.username;
        params = Utils.filterNull(params);//空字符串过滤
        if (method === 'POST' || method === 'PUT') {
            if (Utils.toType(params) == 'object') {
                params = JSON.stringify(params);
            }
            r = r.send(params)
        } else if (method == 'GET' || method === 'DELETE') {
            r = r.query(params)
        }
    }
    r.end(function (err, res) {
        if (err) {
            Message({
                message: 'api error',
                type: 'warning'
            });
            return;
        };
        if (res.body.result) {
            if (success) {
                success(res.body);
            }
        } else if(res.body.flag == -999){
            //token
            Message({
                message: res.body.message,
                type: 'warning'
            });
            localStorage.clear();
            store.commit('SET_UERID','');
            setTimeout(()=>{
                router.push({path: '/passport/login'});
            },1000)
        } else {
            if (failure) {
                failure(res.body);
            } else {
                //alert('error: ' + JSON.stringify(res.body));
                Message({
                    message: res.body.message,
                    type: 'warning'
                });
            }
        }
    });
}

export default {
    get (url, params, success, failure) {
        return apiBase('GET', root + url, params, success, failure)
    },
    post (url, params, success, failure) {
        return apiBase('POST', root + url, params, success, failure)
    },
    sget (url, params, success, failure) {
        return apiBase('GET', sroot + url, params, success, failure)
    },
    spost (url, params, success, failure) {
        return apiBase('POST', sroot + url, params, success, failure)
    },
    pget (url, params, success, failure) {
        return apiPhpBase('GET', proot + url, params, success, failure)
    },
    ppost (url, params, success, failure) {
        return apiPhpBase('POST', proot + url, params, success, failure)
    }
}
