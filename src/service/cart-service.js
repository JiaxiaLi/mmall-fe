/*
* @Author: JiaxiaLi
* @Date:   2017-10-31 07:24:55
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2017-10-31 07:29:25
*/

'use strict';

var _mm = require('../util/mm.js');

var _cart = {
		//获取购物车数量
		getCartCount : function(resolve, reject){
				_mm.request({
						url			: _mm.getServerUrl('/cart/get_cart_product_count.do'),
						success	: resolve,
						error 	: reject
				});
		}
}

module.exports = _cart;