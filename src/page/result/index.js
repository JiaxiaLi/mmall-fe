/*
* @Author: JiaxiaLi
* @Date:   2017-10-31 22:22:07
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2017-11-02 09:49:20
*/

'use strict';
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    
    // 显示对应的提示元素
    $element.show();
})