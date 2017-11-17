---
title: 模块化（seajs）
date: 2017-10-25 21:01:15
tags: [javascript,前端,模块化]
categories: 模块化
---


## 1.模块化的发展过程 ##

问题：命名冲突，依赖问题

1.全局函数时代
命名冲突，可读性差
```
var add=function(v1,v2){
	return v1+v2;
}
var substract=function(v1,v2){
	return v1-v2;
}
var getDate=function(){

    return new Date();
}
var mutiply=function(v1,v2){
	return v1*v2;
}
var divide=function(v1,v2){
	return v1/v2;
}
var add=123; //直接覆盖了add
```

2.命名空间
一类写在一个对象里
命名空间法是通过约定方式定义的
可以解决命名冲突问题，但是很牵强
下划线开头，匈牙利命名法，驼峰命名法
无法解决私有封装问题。
```
var calculator={
    a:123;
 }
calculator.add=function(v1,v2){
	return v1+v2;
}
calculator.substract=function(v1,v2){
	return v1-v2;
}
calculator.mutiply=function(v1,v2){
	return v1*v2;
}
calculator.divide=function(v1,v2){
	return v1/v2;
}

calculator.a=123; //还是可以直接覆盖
```

3.划分私有空间
闭包，自调用匿名行数，return一个对象（函数名）
封装型，划分私有空间
还是需要约定
```
 var calculator=(function(){
       var a=123;
       var add=function(v1,v2){
       		return v1+v2;
       }
       var substract=function(v1,v2){
            return v1-v2;
       }
       var mutiply=function(v1,v2){
            return v1*v2;
       }
       var divide=function(v1,v2){
        	return v1/v2;
       }
       return {
            add:add,
            substract:substract,
            mutiply:mutiply,
            divide:divide
       }
    })()
var  cal=calculator;
cal.add(1,1);
```

4.扩展和维护模块
开闭原则，对直接修改关闭，扩展开发。

```
	var calculator=(function(cal){
        cal.mod=function(v1,v2){
          return v1%v2;
        }
        return cal;
     })(window.calculator||{})
```


5.第三方依赖

```
    var calculator=(function(cal,$){
      cal.add2=function(){
          var v1=$('#v1').val();
          var v2= $('#v2').val();
 
         return (v1-0)+(v2-0);
      }
      return cal;

    })(window.calculator||{},window.$)
    //我在这告诉你我要jquery
    //依赖注入
    //很牵强的解决文件依赖问题的方法
```

## 2.seaJS ##
辅助开发模块化代码的工具。
基于cmd规范。

简单友好的模块定义规范。
自然直管的代码组织方式。

给的例子

hello.js
```
 seajs.config({
    base: "../sea-modules/",
	//别名
    alias: {  
      "jquery": "jquery/jquery/1.10.1/jquery.js"
    }
  });
 
 //开发模式
 if (location.href.indexOf("?dev") > 0) {
    seajs.use("../static/hello/src/main");
  }
  //生产模式
  else {
    seajs.use("examples/hello/1.0.0/main");
  }
```
路径问题：
绝对路径和平时不一样那，默认会有个默认根目录（seajs文件所在目录），如果配置了就用配置的根目录`base`

### seajs.use() ###
引入入口模块，引入的第一个js就是入口模块

seajs.use(src)

获取返回值：
seajs.use(src,function(a){
}



main.js
定义模块
```
define(function(require) {

  var Spinning = require('./spinning');

  var s = new Spinning('#container');
  s.render();

});

```
### 定义模块 ###
define()
request 用来加载文件


spinning.js中
别名的好处 jq

```
define(function(require, exports, module) {

  var $ = require('jquery');

  function Spinning(container) {
    this.container = $(container);
    this.icons = this.container.children();
    this.spinnings = [];
  }

  module.exports = Spinning;

......
```
### module.exports和exports ###
module.exports和私有空间的return很像。
如果什么都不传是一个空对象，是用来打破封装性，返回想要暴露的属性和方法，如果有多个，认最后一个，最好给其属性赋值，不要直接赋值。
`require('./spinning');`得到是`module.exports`的结果。

`exports`是`module.exports`的别名，.属性的时候嫌`module.exports.属性`太长就用`exports.属性`，直接等于的时候用`module.exports`就行，因为这种方式只能用一次。

写在模块最后


引入jquery的方法：
define( function() {
......
return $.noConflict();
});



## 3.RequireJS ##
AMD规范
http://www.requirejs.org/
requirejs是优先加载
seajs是懒加载