/**
 * 常用验证方法
 */

const REGEX_MOBILE = /^(13|15|17|18|14|16|19)[0-9]{9}$/;
const REGEX_PASSWORD = /^[0-9A-Za-z]{6,20}$/;
const REGEX_PASSWORD1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$/;//8-20 数字 字母 特殊符号两种或者以上
const REGEX_EMAIL = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
const REGEX_URL = /[0-9a-zA-z]+.(html|htm|shtml|jsp|asp|php|com|cn|net|com.cn|org)$/;
const REGEX_RATE = /^[1-9]+[0-9]*]*$/;
const REGEX_DCIMAL = /^[0-1]$|^0\.[0-9]+$/;
const REGEX_STRING1 = /^[0-9,]+$/;
const REGEX_HALF = /^[\x00-\xff]*$/;
const REGEX_MONYEY = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
const REGEX_RATE_ZERO = /^[0-9]*$/ ;

export default {
    //正数（最多可两位小数）
    correctMonery (v){
        if (!v) {
            return false
        }
        return REGEX_MONYEY.test(v);
    },
    //正数（最多可两位小数）
    zero_rate (v){
        if (!v) {
            return false
        }
        return REGEX_RATE_ZERO.test(v);
    },
    //手机号
    mobile (v) {
        if (!v) {
            return false
        }
        return REGEX_MOBILE.test(v);
    },
    //密码
    password (v) {
        if (!v) {
            return false
        }
        return REGEX_PASSWORD.test(v);
    },
    password1 (v) {
        if (!v) {
            return false
        }
        return REGEX_PASSWORD1.test(v);
    },

    //邮箱
    email (v) {
        if (!v) {
            return false
        }
        return REGEX_EMAIL.test(v);
    },
    //url
    url (v) {
        if (!v) {
            return false
        }
        return REGEX_URL.test(v);
    },
    //正整数
    rate (v) {
        if (!v) {
            return false
        }
        return REGEX_RATE.test(v);
    },
    //小数 包括0和1
    decimal (v) {
        if (!v) {
            return false
        }
        return REGEX_DCIMAL.test(v);
    },
    //数字与英文逗号组成的字符串
    string1 (v) {
        if (!v) {
            return false
        }
        return REGEX_STRING1.test(v);
    },
    isHalf (v) {
        if (!v) {
            return false
        }
        return REGEX_HALF.test(v);
    },


};

