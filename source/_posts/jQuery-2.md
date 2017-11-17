---
title: jQuery基础(2)
date: 2017-10-12 19:26:25
tags: [javascript,前端,jQuery]
categories: jQuery
---

## 1.DOM节点操作 ##

### 1.1 创建节点 ###

$()函数的另外一个作用：动态创建元素
```
var $spanNode = $(“<span>我是一个span元素</span>”);

var node = $(“#box”).html（“<li>我是li</li>”）；
```

### 1.2 添加节点 ###
$parentNode.append($node)		
在父节点的最后位置  追加一个子节点 相当于JS中 

$node.appendTo($parentNode)
将node节点追加到parentNode中

$parentNode.prepend($node)

$node.prependTo($parentNode)
在父节点的最前面追加子节点

$node.after()
`$("ul li").last().after("<li></li>")`

$node.before()
`$("ul li").first().before("<li></li>")`

$mode.remove()
删除选中的节点

### 1.3 节点替换 ###
$new.replaceAll($old)	新节点替换旧的节点
$old.replaceWith($new)

### 1.4 删除节点 ###	
$parentNode.empty();	节点清空子节点
parentNode.removeChild(node);		
$node.remove()		

### 1.5 克隆节点 ###
$node.clone(true)  节点和其身上的事件都给复制（jq事件）
$node.clone(false)  只给复制节点，本身(包括节点内部信息) 

## 2.事件绑定 ##
### 2.1 .事件（去掉on） ###
click(handler) 				单击事件
blur(handler) 				失去焦点事件
mouseenter(handler) 		鼠标进入事件
mouseleave(handler)			鼠标离开事件
dbclick(handler) 			双击事件
change(handler) 改变事件，如：文本框值改变，下来列表值改变等
focus(handler) 				获得焦点事件
keydown(handler) 			键盘按下事件

### 2.2 .on(事件，函数) ###
最现代的方式，兼容zepto(移动端类似jQuery的一个库)，建议使用

JQ 支持同时绑定多个事件处理程序
JQ的事件不需要循环，可给所有的元素绑定
JQ 事件 执行早于传统的事件绑定
```
// 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
// 第二个参数：selector, 执行事件的后代元素
// 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用
// 第四个参数：handler，事件处理函数
$(selector).on(events[,selector][,data],handler);
```

### 2.3bind方式 ###
不推荐，1.7以后的jQuery版本被on取代
可以同时绑定多个事件，比如：bind(“mouseenter  mouseleave”, function(){})
缺点：要绑定事件的元素必须存在文档中。

### 2.4 delegate方式 ###
特点：性能高，支持动态创建的元素
作用：给匹配到的元素绑定事件，对支持动态创建的元素有效
```
// 第一个参数：selector，要绑定事件的元素
// 第二个参数：事件类型
// 第三个参数：事件处理函数
$(".parentBox").delegate("p", "click", function(){
    //为 .parentBox下面的所有的p标签绑定事件
});
```
与前两种方式最大的优势：减少事件绑定次数提高效率，支持动态创建出来的元素绑定事件！

## 3.事件解绑 ##

### 3.1 off() ###
$(selector).off();
// 解绑匹配元素的所有click事件
$(selector).off(“click”);
// 解绑所有代理的click事件，元素本身的事件不会被解绑 
$(selector).off( “click”, “**” ); 


### 3.2 unbind() ###
作用：解绑 bind方式绑定的事件
$(selector).unbind(); //解绑所有的事件
$(selector).unbind(“click”); //解绑指定的事件

### 3.3 undelegate() ###
作用：解绑delegate方式绑定的事件
$( selector ).undelegate(); //解绑所有的delegate事件
$( selector).undelegate( “click” ); //解绑所有的click事件


## 4. Ajax ##

$.ajax({
type : 		请求类型
url :			请求地址
async:		是否异步
data:		请求参数	url组装好的格式或者{}json形式
success:		fn	成功时的处理
error:		fn	失败时的处理
dataType:		返回值的类型 用于解析数据的
})

$.get(url,success, dataType);
$.post(url, data, success, dataType);


使用jquery的ajax方法执行jsonp请求
$.ajax({
type : “get”,
async : true,
url : “index.php”,
dataType: “jsonp”,
jsonp: “callback”	 	在index.php中使用$_GET[‘callback’]来获取回调函数名
success: function (result) {
},
});


## 5.动画 ##
jQuery预设的三组动画效果的语法几乎一致：参数可以有两个，第一个是动画的执行时长，第二个是动画执行完成后的回调函数。
第一个参数是：可以是指定字符或者毫秒数

1.无参：和 display:block 没啥区别

2.数值，毫秒，动画显示时间
已预定好的值：
slow：600ms、normal：400ms、fast：200ms

3.数值和回掉函数
例如：
```
$(selector).hide(1000); // 1000表示什么？
$(selector).hide(“slow”);
$(selector).hide(1000, function(){});
$(selector).hide();
```

### 5.1 显示隐藏 ###
.show() 显示动画
.hide() 显示动画
.toggle() 切换动画

### 5.2 滑动 ###
.sildeDown()
.sildeUp()
.slideToggle()

### 5.3 淡入淡出 ###
.fadeIn()
.fadeOut()
.fadeToggle()
淡入淡出可以指定透明度
.fadeTo(time, 透明度(0~1),回掉函数)

### 5.4 自定义动画 ###
.animate({params},speed,callback);
`.animate({"display":"block","opacity":0.5,"width":200,"height":200},2000);`

### 5.5 停止动画 ###
.stop(clearQueue,jumpToEnd)
用于多个动画添加到同一元素

第一个参数表示后续动画是否要执行
true:后续动画不执行  ;false:后续动画会执行
第二个参数表示当前动画是否执行完
true:立即执行完成当前动画,回调函数也会立即执行;false:立即停止当前动画

都不给，默认false；

## 6. 尺寸位置 ##
### 6.1 宽高 ###

height()
width()
有参数表示设置，与css相比，没有单位px

### 6.2 坐标 ###
1.offset() 

1.无参数表示获取，返回值为：{left:num, top:num}，值是相对于document的位置

2.$(selector).offset();
有参数表示设置，参数推荐使用数值类型
$(selector).offset({left:100, top: 150});

设置offset后，如果元素没有定位(默认值：static)，则被修改为relative

2.position() 
作用：获取相对于其最近的具有定位的父元素的位置。
获取，返回值为对象：{left:num, top:num}
$(selector).position();
注意：只能获取，不能设置。

3.scrollTop() 
作用：获取或者设置元素垂直方向滚动的位置
// 无参数表示获取偏移
// 有参数表示设置偏移，参数为数值类型
$(selector).scrollTop(100);

scrollLeft() 
作用：获取或者设置元素水平方向滚动的位置
$(selector).scrollLeft(100);

对scrollTop的理解：
垂直滚动条位置是可滚动区域，在可视区域上方的被隐藏区域的高度。
如果滚动条在最上方没有滚动或者当前元素没有出现滚动条，那么这个距离为0


## 7.其他 ##
### 7.1 链式操作 ###

链式编程原理：return this;
通常情况下，只有设置操作才能把链式编程延续下去。因为获取操作的时候，会返回获取到的相应的值，无法返回 this。

end(); // 结束当前链最近的一次过滤操作，并且返回匹配元素之前的状态。

### 7.2 遍历方法 ###

$.each(arr/obj, function (key, val) {})

$(选择器).each(function (key, ele) {})
