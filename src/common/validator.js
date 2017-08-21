/**
 * 常用验证方法
 */

const REGEX_MOBILE = /^(13|15|17|18|14)[0-9]{9}$/;
const REGEX_PASSWORD = /^[0-9A-Za-z]{6,20}$/;
const REGEX_EMAIL = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
const REGEX_URL = /[0-9a-zA-z]+.(html|htm|shtml|jsp|asp|php|com|cn|net|com.cn|org)$/;
const REGEX_RATE = /^[1-9]+[0-9]*]*$/;

export default {
    //验证手机号是否正确
    mobile (v) {
        if (!v) {
            return false
        }
        return REGEX_MOBILE.test(v);
    },

    password (v) {
        if (!v) {
            return false
        }
        return REGEX_PASSWORD.test(v);
    },

    email (v) {
        if (!v) {
            return false
        }
        return REGEX_EMAIL.test(v);
    },

    url (v) {
        if (!v) {
            return false
        }
        return REGEX_URL.test(v);
    },

    rate (v) {
        if (!v) {
            return false
        }
        return REGEX_RATE.test(v);
    }
};

