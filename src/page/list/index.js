/**
 * @author waynechu1996@gmail.com
 * Created 2018-06-07 16:05
 */
"use strict";

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword: _mm.getUrlParam('keyword') || '',
            categoryId: _mm.getUrlParam('categoryId') || '',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20,
            orderBy: _mm.getUrlParam('orderBy') || 'id'
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadList();
    },
    bindEvent: function () {
        var _this = this;
        // 排序按钮的点击事件
        $('.sort-item').click(function () {
            var $this = $(this);
            // 重置页数
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if ($this.data('type') === 'default') {
                // 已经是active样式
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'id';
                }
            } else if ($this.data('type') === 'price') { // 点击价格排序
                // active class 的处理
                $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                // 升序、降序的处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载商品list数据
    loadList: function () {
        var _this = this,
            listHtml = '',
            requestParam = this.data.listParam,
            $pListCon = $('.prod-con');
        //$pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的请求参数
        requestParam.categoryId ? (delete requestParam.keyword) : (delete requestParam.categoryId);
        // 发起请求
        _product.getProductList(requestParam, function (res) {
            listHtml = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (errMsg) {
            _mm.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this;
        if (!this.pagination) {
            this.pagination = new Pagination();
        }
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pg-con'),
            // 点击按钮的回调事件
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};

$(function () {
    page.init();
});