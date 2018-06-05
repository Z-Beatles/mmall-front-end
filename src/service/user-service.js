var _mm = require('util/mm.js');

var _user = {
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查注册信息是否合法（包括用户名username、电话mobile、邮箱email的校验）
    checkRegisterParam: function (param, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/check_valid.do'),
            data: param,
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取用户信息
    getUserInfo: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/get_user_info.do'),
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    // 获取当前用户信息，并强制登录
    getCurrUserInfo: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/get_curr_user_info.do'),
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    // 退出登录
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/logout.do'),
            method: 'DELETE',
            success: resolve,
            error: reject
        });
    },
    // 忘记密码
    getQuestion: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/forget_get_question.do'),
            data: {
                'username': username
            },
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    // 提交问题答案
    checkAnswer: function (params, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/forget_check_answer.do'),
            data: params,
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    // 忘记密码的重设密码
    resetPasswd: function (params, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/user/forget_reset_password.do'),
            data: params,
            method: 'POST',
            success: resolve,
            error: reject
        });
    }

};

module.exports = _user;