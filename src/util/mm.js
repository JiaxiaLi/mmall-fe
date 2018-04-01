/*
* @Author: JiaxiaLi
* @Date:   2017-10-25 22:43:20
* @Last Modified by:   JiaxiaLi
* @Last Modified time: 2017-12-25 07:24:49
*/

'use strict';
var Hogan   = require('hogan');
var conf    = {
    serverHost : ''
};
var _mm = {
	// 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'get',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function (name){
        var reg     = new RegExp('(^|&)'+ name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml : function (htmlTemplate,data){
        //模板的编译
        var template = Hogan.compile(htmlTemplate),
            //模板的渲染
            result   = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || "操作成功!");
    },
    //错误提示
    errorTips : function(msg){
        alert(msg || "哪里出错了~~");
    },
    //字段的验证，支持非空、手机号码、邮箱的判断
    validate : function (value,type){
        var value = $.trim(value);
        //非空判断
        if ('require' === type ){
            return !!value; //两个！强制转换成 Boolean 类型
        }
        //手机号码130-139,150-159,180-189,170-179,140-149号码段
        else if('phone' === type){
            return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(17[0-9]{1}))+\d{8})/.test(value);
        }
        //邮箱的判断
        else if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一登录处理
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //回首页
    goHome : function(){
        window.location.href ='./index.html';
    }
};

module.exports = _mm;