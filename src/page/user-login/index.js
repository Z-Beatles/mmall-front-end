require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// 表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var loginPage = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function () {
            _this.submit();
        });
        // 如果按下回车，也提交表单
        $('.register-input').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },
    // 提交表单
    submit: function () {
        var formData = {
            account: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        var validateResult = this.formValidate(formData);
        // 验证成功，提交登录表单
        if (validateResult.status) {
            _user.login(formData, function (res) {
                window.location.href = _mm.getUrlParam('redirect') || './index.html'
            }, function (errMsg) {
                formError.show(errMsg);
            });
        } else { // 验证失败，显示错误提示框
            formError.show(validateResult.msg);
        }
    },
    // 表单验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validata(formData.account, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validata(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};

$(function () {
    loginPage.init();
});