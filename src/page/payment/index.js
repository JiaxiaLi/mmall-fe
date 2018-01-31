/*
* @Author: JiaxiaLi
* @Date:   2018-01-31 22:47:51
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2018-01-31 23:57:52
*/

'use strict';
/*
* @Author: JiaxiaLi
* @Date:   2018-01-31 19:14:39
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2018-01-31 22:27:05
*/

'use strict';
require('./index.css');
require('../common/nav/index.css');
require('../common/header/index.css');
var _mm 					= require('../../util/mm.js');
var _payment			= require('../../service/payment-service.js');
var templateIndex = require('./index.string');

//page 逻辑部分
var page = {
		data : {
				orderNumber : _mm.getUrlParam('orderNumber')
		},
		init: function(){
				this.onLoad();
		},
		onLoad : function(){
				//加载支付数据
				this.loadPaymentInfo();
		},
		// 加载支付数据
		loadPaymentInfo : function(){
				var _this			  		= this,
						paymentHtml 		= '',
						$pageWrap 		  = $('.page-wrap');
				$pageWrap.html('<div class="loading"></div>');
				_payment.getPaymentInfo(this.data.orderNumber, function(res){
						//渲染html
						paymentHtml = _mm.renderHtml(templateIndex, res);
						$pageWrap.html(paymentHtml);
						_this.listenOrderStatus();
				},function(errMsg){
						$pageWrap.html('<p class="err-tip">'+ errMsg +'</p>');
				});
		},
		//监听状态
		listenOrderStatus : function(){
				var _this = this;
				this.paymentTimer = window.setInterval(function(){
						_payment.getPaymentStatus(this.data.orderNumber, function(res){
								if (res == true) {
										window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
								}
						});
				}, 5e3);
		}
};

$(function(){
		page.init();
});