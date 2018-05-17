var _mm = require('util/mm.js');

var _user = {
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/sessions'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查注册信息是否合法（包括用户名username、电话mobile、邮箱email的校验）
    checkRegisterParam: function (param, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/users/check-' + param.type),
            data: param,
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/users'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取当前用户信息
    getCurrUserInfo: function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/users/me'),
            method: 'GET',
            success: resolve,
            error: reject
        });
    },
    //
    logout: function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/sessions'),
            method: 'DELETE',
            success: resolve,
            error: reject
        });
    }
};

module.exports = _user;