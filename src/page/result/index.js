/*
* @Author: JiaxiaLi
* @Date:   2017-10-31 22:22:07
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2018-01-31 23:53:58
*/

'use strict';
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if (type === 'payment') {
    		var orderNumber = _mm.getUrlParam('orderNumber'),
    				$orderNumber = $element.find('.order-number');
    		$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    // 显示对应的提示元素
    $element.show();
})