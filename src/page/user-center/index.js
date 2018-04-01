/*
* @Author: JiaxiaLi
* @Date:   2017-12-03 18:24:34
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2017-12-03 19:55:36
*/

'use strict';
require('./index.css');
require('../common/nav/index.css');
require('../common/header/index.css');
var navSide 			= require('../common/nav-side/index.js');
var nav 					= require('../common/nav/index.js');
var _mm 					= require('../../util/mm.js');
var _user					= require('../../service/user-service.js');
var templateIndex = require('./index.string');

//page 逻辑部分
var page = {
		init: function(){
				this.onLoad();
		},
		onLoad : function(){
				//初始化左侧菜单
				navSide.init({
						name : 'user-center'
				});
				//加载用户信息
				this.loadUserInfo();
		},
		loadUserInfo : function(){
				//加载用户信息
				var userHtml = '';
				_user.getUserInfo(function(res){
						userHtml = _mm.renderHtml(templateIndex,res);
						$('.panel-body').html(userHtml);
				},function(errMsg){
						_mm.errorTips(errMsg);
				});
		}
		
};

$(function(){
		page.init();
});