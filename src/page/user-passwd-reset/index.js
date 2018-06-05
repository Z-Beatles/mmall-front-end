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
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        // 第一步：输入用户名
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function (errMsg) {
                    formError.show(errMsg)
                })
            } else {
                formError.show('请输入用户名')
            }
        });
        // 第二步：输入密码问题
        $('#submit-answer').click(function () {
            var answer = $.trim($('#answer').val());
            if (answer) {
                var requestParams = {
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                };
                _user.checkAnswer(requestParams, function (res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入密码提示问题的答案')
            }
        });
        // 第三步：输入新密码
        $('#submit-password').click(function () {
            var passwdNew = $.trim($('#passwdNew').val());
            if (passwdNew) {
                if (passwdNew.length >= 6) {
                    var requestParams = {
                        username: _this.data.username,
                        passwordNew: passwdNew,
                        forgetToken: _this.data.token
                    };
                    _user.resetPasswd(requestParams, function (res) {
                        window.location.href = './result.html?type=reset-passwd'
                    }, function (errMsg) {
                        formError.show(errMsg);
                    });
                } else {
                    formError.show('密码格式不正确，需以字母开头，长度在6~18的非空字符');
                }
            } else {
                formError.show('请输入新密码');
            }
        });
    },
    // 加载第一步：输入用户名
    loadStepUsername: function () {
        $('.step-username').show();
    },
    // 加载第二步：输入密码问题答案
    loadStepQuestion: function () {
        // 隐藏错误提示
        formError.hide();
        $('.step-username').hide().siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    // 加载第三步：输入新密码
    loadStepPassword: function () {
        // 隐藏错误提示
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    }
};

$(function () {
    page.init();
});