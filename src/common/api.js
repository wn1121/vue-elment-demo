/**
 * @author wangna
 * @date 17/07/20
 */
import request from 'superagent';
import Utils from './utils';
import router from '../config/routes'
import store from '../store/index'
//import Host from '../config/host';
import { Message } from 'element-ui';

const root = '/api';

function apiBase(method, url, params, success, failure) {
    var r = request(method, url).type('application/json').set('Token', localStorage.getItem('token')||'');
    if (params) {
        params = Utils.filterNull(params);
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
        if (res.body.code == 0 && res.body.result) {
            if (success) {
                success(res.body);
            }
        } else if(res.body.code == -999){
            //未登录
            Message({
                message: res.body.msg,
                type: 'warning'
            });
            store.dispatch('LogOut');
        } else if(res.body.code == -997){
            //未权限
            Message({
                message: res.body.msg,
                type: 'warning'
            });
            setTimeout(
                function () {
                    router.push({path: '/dashboard'});
                },1000)
        } else {
            if (failure) {
                failure(res.body);
            } else {
                //alert('error: ' + JSON.stringify(res.body));
                Message({
                    message: res.body.msg,
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
    put (url, params, success, failure) {
        return apiBase('PUT', root + url, params, success, failure)
    },
    delete (url, params, success, failure) {
        return apiBase('DELETE', root + url, params, success, failure)
    }
}
