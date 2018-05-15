var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
};
var _mm = {
    // 网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                if (0 === res.code) { // 请求成功
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (1 === res.code) { // 请求失败
                    typeof param.error === 'function' && param.error(res.msg);
                } else if (1006 === res.code) { // 尚未登录
                    _this.doLogin();
                } else if (1013 === res.code) { // 缺少请求参数
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    // 获取服务器地址
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    // 获取url中指定参数的值
    getUrlParam: function(name) {
        // mmall.com/products?pageNum=1&pageSize=8
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 使用hogan渲染html模板
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function(msg) {
        alert(msg || '操作成功~');
    },
    // 失败提示
    errorTips: function(msg) {
        alert(msg || '操作失败！');
    },
    // 字段的校验，支持非空判断，手机和邮箱的判断
    validata: function(value, type) {
        var value = $.trim(value);
        // 非空验证
        if ('require' === type) {
            return !!value;
        }
        // 手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
            // return /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(value);
        }
        // 邮箱格式验证
        if ('email' === type) {
            return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value);
        }
    },
    // 统一登录处理
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //
    goHome: function() {
        window.location.href = './index.html'
    }
};

module.exports = _mm;