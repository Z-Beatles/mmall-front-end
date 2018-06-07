/**
 * @author waynechu1996@gmail.com
 * Created 2018-06-06 21:41
 */
'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');

var templateBanner = require('./banner.string');
var _mm = require('util/mm.js');

$(function () {
    // 渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-container').html(bannerHtml);
    // 初始化banner.  link -> http://basicslider.com/
    $('.banner').bjqs({
        animtype: 'fade',
        height: 370,
        width: 830,
        nexttext: '<',
        prevtext: '>'
    });
});