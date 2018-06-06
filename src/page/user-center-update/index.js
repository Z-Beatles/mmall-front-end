/**
 * @author waynechu1996@gmail.com
 * Created 2018-06-05 21:06
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
        this.bindEvent();
    },
    onLoad: function () {
        // 初始化侧边导航
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                    phone: $.trim($('#phone').val()),
                    email: $.trim($('#email').val()),
                    question: $.trim($('#question').val()),
                    answer: $.trim($('#answer').val())
                },
                validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                // 更新用户信息
                _user.updateUserInfo(userInfo, function (res, msg) {
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        })
    },
    // 加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        _user.getCurrUserInfo(function (res) {
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    },
    // 验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        // 如果填写了电话则对电话号码进行验证
        console.log(formData.mobile);
        if (formData.mobile && !_mm.validata(formData.mobile, 'mobile')) {
            result.msg = '手机号码格式不正确';
            return result;
        }
        // 如果填写了邮箱则对邮箱进行验证
        if (formData.email && !_mm.validata(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 如果填写了密码提示问题或答案则对密码提示问题进行验证
        if ((formData.question || formData.answer) && !_mm.validata(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (formData.question && !_mm.validata(formData.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function () {
    page.init();
});