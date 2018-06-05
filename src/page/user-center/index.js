/**
 * @author waynechu1996@gmail.com
 * Created 2018-06-05 20:42
 */
"use strict";

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        // 初始化侧边导航
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    loadUserInfo: function () {
        var userHtml = '';
        _user.getCurrUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    }
};

$(function () {
    page.init();
});