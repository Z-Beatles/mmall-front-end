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

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;

        $('#username').blur(function () {
            var username = $.trim($(this).val());
            // 用户名为空则返回，不进行异步校验
            if (!username) return;
            // 异步检查用户名是否合法
            var checkParam = {'param': username, 'type': 'username'};
            _user.checkRegisterParam(checkParam,
                function () {
                    formError.hide();
                },
                function (errMsg) {
                    formError.show(errMsg);
                });
        });
        // 立即注册按钮的点击事件
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
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val()),
            passwordConfirm: $.trim($('#password-confirm').val()),
            mobile: $.trim($('#mobile').val()),
            email: $.trim($('#email').val()),
            question: $.trim($('#question').val()),
            answer: $.trim($('#answer').val())
        };
        var validateResult = this.formValidate(formData);
        // 验证成功，提交登录表单
        if (validateResult.status) {
            _user.register(formData, function () {
                window.location.href = './result.html?type=register'
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
        if (!_mm.validata(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validata(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = '密码长度不能少于6位';
            return result;
        }
        if (formData.password !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result;
        }
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