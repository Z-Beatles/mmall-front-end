/**
 * @author waynechu1996@gmail.com
 * Created 2018-06-07 16:13
 */
"use strict";
var _mm = require('util/mm.js');

var _product = {
    // 获取商品列表
    getProductList: function (params, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/v1/products'),
            method: 'GET',
            data: params,
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;