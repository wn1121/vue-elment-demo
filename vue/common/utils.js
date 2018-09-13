export default {
    /**
     * url参数格式化
     * 例：?param=1
     * 参数得到方式：paramsObj.param
     */
    paramsFormat (url) {
        var qInd = url.indexOf('?');
        var sharpInd = url.indexOf('#'); //路由
        var search = "";
        var paramsList = [];
        var paramsObj = {};

        if (qInd >= 0) {
            if (sharpInd > 0) {
                search = url.substring(qInd + 1, sharpInd);
            } else {
                search = url.substring(qInd + 1);
            }
            paramsList = search.split('&');
            for (var ind in paramsList) {
                var param = paramsList[ind];
                if (param) {
                    var pind = param.indexOf("=");
                    if (pind >= 0) {
                        paramsObj[param.substring(0, pind)] = param.substr(pind + 1);
                    } else {
                        paramsObj[param] = "";
                    }
                }

            }
        }
        return paramsObj;
    },

    /**
     * 获取url hash的值
     * 例：/details.html?itemid=1#sort=asc&price=100
     * 返回: {sort: "asc", price: 100 }
     */
    hashFormat (url) {
        var hashObj = {};
        var sind = url.indexOf('#');
        if (sind >= 0) {
            var hstr = url.substring(sind + 1);
            var paramsList = hstr.split("&");
            for (var i = 0; i < paramsList.length; i++) {
                var param = paramsList[i];
                var pind = param.indexOf("=");
                if (pind >= 0) {
                    hashObj[param.substring(0, pind)] = param.substr(pind + 1);
                } else {
                    hashObj[param] = "";
                }
            }
        }

        return hashObj;
    },

    /**
     * 返回时间的天、时、分、秒
     * param : 秒
     */
    getHhmmss (time) {
        time = parseInt(time);
        if (time <= 0) time = 0;
        var s = time >= 60 ? time % 60 : time;
        var m = parseInt((time >= 3600 ? time % 3600 : time) / 60);
        var h = parseInt((time >= 86400 ? time % 86400 : time) / 3600);
        var d = parseInt(time / 86400);
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        return {
            d: d,
            h: h,
            m: m,
            s: s
        }
    },

    /**
     * 对象合并
     */
    mergeObj (...sources) {
        return Object.assign({}, ...sources);
    },

    /**
     * 过滤函数
     */
    filterNull (o) {
        for (var key in o) {
            if (o[key] == null) {
                delete o[key]
            }
            if (this.toType(o[key]) == 'string') {
                o[key] = o[key].trim()
                if (o[key].length == 0) {
                    delete o[key]
                }
            }
        }
        return o
    },

    /**
     * 自定义判断元素类型
     */
    toType (obj){
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    },

    fmtNum(num) {
        return num >= 10 ? num : ("0" + num);
    },

    //格式化 yyyy-mm-dd hh:mm:ss
    formatDate(date) {
        if (date) {
            var d = new Date(date);
            var arr1 = [d.getFullYear(), this.fmtNum(d.getMonth() + 1), this.fmtNum(d.getDate())];
            var arr2 = [this.fmtNum(d.getHours()),this.fmtNum(d.getMinutes()),this.fmtNum(d.getSeconds())];
            return arr1.join("-")+' '+arr2.join(":");
        }
        return "";
    },

    //格式化 yyyy-mm-dd
    formatDate1(date) {
        if (date) {
            var d = new Date(date);
            var arr1 = [d.getFullYear(), this.fmtNum(d.getMonth() + 1), this.fmtNum(d.getDate())];
            //var arr2 = [this.fmtNum(d.getHours()),this.fmtNum(d.getMinutes()),this.fmtNum(d.getSeconds())];
            return arr1.join("-");
        }
        return "";
    },

    formatTime(time) {
        if (time) {
            let hour = parseInt(time/1000/3600);
            let min = parseInt((time/1000 - hour * 3600)/60);
            let sec = parseInt(time/1000 - hour * 3600 - min * 60);
            min = min>=10?min:'0' + min;
            sec = sec>=10?sec:'0' + sec;
            return hour + '时' + min + '分' + sec + '秒';
        }
        return "";
    },

    /**
     * 查询表单重置
     * obj: 表单对象
     */
    resetQueryForm(obj) {
        for(var item in obj){
            if(item == "pageSize" || item == "page_size"){
                obj[item] = 10;
                continue;
            }
            if(item == "pageNo" || item == "page_no" || item == "currentPage"){
                obj[item] = 1;
                continue;
            }
            obj[item] = '';
        }
    }
}
