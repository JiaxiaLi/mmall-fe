/*
* @Author: JiaxiaLi
* @Date:   2017-12-04 20:49:04
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2017-12-04 21:27:00
*/

'use strict';
require('./index.css');
require('../common/nav/index.css');
require('../common/header/index.css');
var navSide 			= require('../common/nav-side/index.js');
var nav 					= require('../common/nav/index.js');
var _mm 					= require('../../util/mm.js');
var _user					= require('../../service/user-service.js');


//page 逻辑部分
var page = {
		init: function(){
				this.onLoad();
				this.bindEvent();
		},
		onLoad : function(){
				//初始化左侧菜单
				navSide.init({
						name : 'user-pass-update'
				});
		},
		bindEvent : function(){
				var _this = this;
				//点击提交按钮后的动作
				$(document).on('click', '.btn-submit', function() {
						var userInfo = {
								password				: $.trim($('#password').val()),
								passwordNew			: $.trim($('#password-new').val()),
								passwordConfirm	: $.trim($('#password-confirm').val())
						},
						validateResult = _this.validateForm(userInfo);
						if(validateResult.status){
								//更改用户密码
								_user.updatePassword({
										passwordOld : userInfo.password,
										passwordNew : userInfo.passwordNew
								},function(res,msg){
										_mm.successTips(msg);
								},function(errMsg){
										_mm.errorTips(errMsg);
								});
						}
						else{
								_mm.errorTips(validateResult.msg);
						}
				});
		},
		//验证字段信息
		validateForm : function(formData){
				var result = {
						status : false,
						msg		 : ''
				};

				//验证原密码是否为空
				if (!_mm.validate(formData.password,'require')) {
						result.msg = '原密码不能为空';
						return result;
				}
				//验证新密码长度
				if (!formData.passwordNew || formData.passwordNew.length < 6 ) {
						result.msg = '密码长度不得少于6位';
						return result;
				}
				//验证两次输入的密码是否一致
				if (formData.passwordNew !== formData.passwordConfirm) {
						result.msg = '两次输入的密码不一致';
						return result;
				}
				//通过验证，返回正确提示
				result.status = true;
				result.msg 		= '通过验证';
				return result;
		}
};

$(function(){
		page.init();
});