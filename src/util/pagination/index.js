/**
 * @author waynechu1996@gmail.com
 * Created 2018-06-08 22:42
 */
"use strict";

require('./index.css');
var _mm = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination = function () {
    var _this = this;
    this.defaultOptions = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    // 绑定点击事件
    $(document).on('click', '.pg-item', function () {
        var $this = $(this);
        // 对于active和disabled的按钮点击，不作处理
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
    });
};

// 渲染分页组件
Pagination.prototype.render = function (userOption) {
    // 合并选项
    this.option = $.extend({}, this.defaultOptions, userOption);
    // 判断容器是否为合法的jQuery对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    // 判断容器是否只有一页
    if (this.option.pages <= 1) {
        return;
    }
    // 渲染分页内容
    this.option.container.html(this.getPaginationHtml());
};

// 获取分页按钮的html   |上一页| 3 4 =5= 6 7 8 |下一页| 5/9
Pagination.prototype.getPaginationHtml = function () {
    var html = '',
        option = this.option,
        pageArray = [],
        start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
        end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });
    // 数字按钮的数据
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: i === option.pageNum
        });
    }
    // 下一页按钮的数据
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    return html;
};

module.exports = Pagination;