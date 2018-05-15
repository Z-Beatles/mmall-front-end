require('./index.css');

var _mm = require('util/mm.js');

var header = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        var keyword = _mm.getUrlParam('keyword');
        // 搜索关键字回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function () {
        var _this = this;
        // 点击搜索，提交搜索关键字
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });

        // 键盘敲击回车，提交搜索关键字
        $('#search-input').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        })
    },
    // 搜索的提交
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword) { // 有keyword则跳转到list页
            window.location.href = './list.html?keyword=' + keyword;
        } else { // 否则返回首页
            _mm.goHome();
        }
    }
};

header.init();