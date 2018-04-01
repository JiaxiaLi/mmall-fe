/*
* @Author: JiaxiaLi
* @Date:   2017-10-17 14:23:22
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2017-12-17 16:32:09
*/
'use strict';
require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');
require('../../util/slider/index.js');
var navSide 		= require('../common/nav-side/index.js');
var templateBanner 	= require('./banner.string');
var _mm 			= require('../../util/mm.js');

$(function() {
		//渲染banner的html
		var bannerHtml = _mm.renderHtml(templateBanner);
		$('.banner-con').html(bannerHtml);
		//初始化banner
    var $slider 	 = $('.banner').unslider({
    		dots: true
    });
    //前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
    		var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    		$slider.data('unslider')[forward]();
    });
});

navSide.init({
		name : 'order-list'
});