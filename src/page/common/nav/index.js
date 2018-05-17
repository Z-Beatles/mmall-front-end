'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service');

// 顶部导航
var nav = {
    init: function () {
        this.loadUserInfo();
        this.bindEvent();
    },
    bindEvent: function () {
        // 点击登录触发该事件
        $('.js-login').click(function () {
            _mm.doLogin();
        });
        // 点击注册触发该事件
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        });
        // 点击退出触发该事件
        $('.js-logout').click(function () {
            _user.logout(function () {
                window.location.reload();
            }, function (errMsg) {
                _mm.errorTips(errMsg);
            });
        });
    },
    // 加载用户信息
    loadUserInfo: function () {
        _user.getCurrUserInfo(function (res) {
            $('.nav-user .not-login').hide().siblings('.nav-user .login').show()
                .find('.username').text(res.username);
        }, function (errMsg) {
            // do nothing here.
        });
    }
};

module.exports = nav.init();