/**
 * @author waynechu1996@gmail.com
 * Created 2018-06-06 17:33
 */
"use strict";

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        // 初始化侧边导航
        navSide.init({
            name: 'user-passwd-update'
        });
    },
    bindEvent: function () {
        var _this = this;
        $('.btn-submit-password').click(function () {
            var formData = {
                    passwordOld: $.trim($('#passwordOld').val()),
                    passwordNew: $.trim($('#passwordNew').val()),
                    passwordConfirm: $.trim($('#passwordConfirm').val())
                },
                validateResult = _this.validateForm(formData);
            if (validateResult.status) {
                _user.updatePassword({
                    passwordOld: formData.passwordOld,
                    passwordNew: formData.passwordNew
                }, function (res, msg) {
                    _mm.successTips(msg);
                }, function (errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validata(formData.passwordOld, 'require')) {
            result.msg = '旧密码不能为空';
            return result;
        }
        // 新密码长度
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        // 验证密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
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