/*
* @Author: JiaxiaLi
* @Date:   2017-10-30 07:18:27
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2017-11-02 13:59:30
*/

'use strict';
require('./index.css');
var _mm 	= require('../../../util/mm.js');
var _user = require('../../../service/user-service.js');
var _cart = require('../../../service/cart-service.js');
//导航
var nav ={
		init : function(){
				this.bindEvent();
				this.loadUserInfo();
				this.loadCartCount();
				return this;
		},
		bindEvent : function(){
				//登录点击事件
				$('.js-login').click(function() {
						console.log("开始点击");
						_mm.doLogin();
				});
				//注册点击事件
				$('.js-register').click(function() {
						window.location.href = '/register.html';
				});
				//退出点击事件
				$('.js-logout').click(function() {
						_user.logout(function(res){
								window.location.reload();
						},function(errMsg){
								_mm.errorTips(errMsg);
						});
				});
		},
		//加载用户信息
		loadUserInfo : function(){
				_user.checkLogin(function(res){
						$('.user.not-login').hide().siblings('.user.login').show().find('.username').test(res.name);
				},function(errMsg){
						//do nothing
				});
		},
		//加载购物车数量
		loadCartCount : function(){
				_cart.getCartCount(function(res){
						$('.nav .cart-count').test(res || 0);
				},function(errMsg){
						$('.nav .cart-count').text(0);
				});
		}
};

module.exports = nav.init();