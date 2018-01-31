/*
* @Author: JiaxiaLi
* @Date:   2018-01-31 19:14:39
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2018-01-31 22:27:05
*/

'use strict';
'use strict';
require('./index.css');
require('../common/nav/index.css');
require('../common/header/index.css');
var navSide 			= require('../common/nav-side/index.js');
var nav 					= require('../common/nav/index.js');
var _mm 					= require('../../util/mm.js');
var _order				= require('../../service/order-service.js');
var Pagination    = require('../../util/pagination/index.js');
var templateIndex = require('./index.string');

//page 逻辑部分
var page = {
		data : {
				orderNumber : _mm.getUrlParam('orderNumber')
		},
		init: function(){
				this.onLoad();
				this.bindEvent();
		},
		onLoad : function(){
				//初始化左侧菜单
				navSide.init({
						name : 'order-list'
				});
				//加载detail数据
				this.loadDetail();
		},
		bindEvent : function(){
				var _this = this;
				$(document).on('click', '.order-cancel', function() {
						if(window.confirm('确定要取消该订单么？')){
								_order.cancelOrder(_this.data.orderNumber,function(res){
					  	  		_mm.successTips("该订单取消成功 ！");
					  	  		_mm.loadDetail();
					  		},function(errMsg){
					  	  		_mm.errorTips(errMsg);
					  		});
						}
				});
		},
		//加载Detail数据
		loadDetail : function(){
				var _this			  		= this,
						orderDetailHtml = '',
						$content 		  	= $('.content');
				$content.html('<div class="loading"></div>');
				_order.getOrderDetail (this.data.orderNumber, function(res){
						_this.dataFilter(res);
						//渲染html
						orderDetailHtml = _mm.renderHtml(templateIndex, res);
						$content.html(orderDetailHtml);
				},function(errMsg){
						$content.html('<p class="err-tip">'+ errMsg +'</p>');
				});
		},
		//数据的适配
		dataFilter : function(data){
				data.needPay 				= data.status == 10;
				data.isCancelable   = data.status == 10;
		}
};

$(function(){
		page.init();
});