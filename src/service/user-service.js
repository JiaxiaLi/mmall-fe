/*
* @Author: JiaxiaLi
* @Date:   2017-10-31 07:00:42
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2017-11-06 19:20:24
*/

'use strict';

var _mm 	= require('../util/mm.js');

var _user = {
		//检查登录状态
		checkLogin : function (resolve, reject){
				_mm.request({
						url			: _mm.getServerUrl('/user/get_user_info.do'),
						method	: 'POST',
						success : resolve,
						error   : reject,
				});
		},
		//登出
		logout : function (resolve, reject){
				_mm.request({
						url			: _mm.getServerUrl('/user/logout.do'),
						method	: 'POST',
						success : resolve,
						error   : reject,
				});
		}
}

module.exports = _user;