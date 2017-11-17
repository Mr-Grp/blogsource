---
title: js特效（焦点图）
date: 2017-10-04 20:23:23
tags: [javascript,特效]
categories: js特效
---


##  1.JS三大系列 ##
### 1.1三大家族 ###
offset/scroll/client

### 1.2事件对象/event ###
事件被触动时，鼠标和键盘的状态，通过属性控制）


## 2.offset及常用属性 ##
为方便的获取元素尺寸的办法就是offset家族；

### 2.1 offsetWidth		offsetHeight ###
得到对象的宽度和高度(自己的，与他人无关)
offsetWidth = width+padding+border

### 2.2 offsetLeft    offsetTop ###
返回距离上级盒子（带有定位）左边的位置
如果父级都没有定位则以body 为准
offsetLeft 从父亲的padding 开始算，父亲的border不算

### 2.3 offsetParent ###
1.返回改对象的父级 （带有定位）
如果当前元素的父级元素没有进行CSS定位（position为absolute或relative，fixed），offsetParent为body。
2。如果当前元素的父级元素中有CSS定位（position为absolute或relative，fixed），	offsetParent取最近的那个父级元素。

### 2.4 offsetTop style.top 的区别 ###
+	最大区别在于  offsetLeft  可以返回没有定位盒子的距离左侧的位置。 而 style.top 不可以。
+	offsetTop 返回的是数字，而 style.top 返回的    	是字	符串，除了数字外还带有单位：px。
+	offsetTop 只读，而 style.top 可读写。
+	如果没有给 HTML 元素指定过 top 样式（行内样式），则 	style.top 返回的是空字符串。

### 2.5 应用：焦点图 ###
原理：盒子本身的位置+步长
<a href='/html/test.html' target='_blank'>特效演示</a>

代码：
```
---
layout: false
---

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<script src="jquery.js"></script>
<style type="text/css">
	*{ padding: 0; margin: 0; border: 0; list-style: none;}
	#box{ margin:100px auto; width: 500px; height: 200px; padding: 5px; border: 1px solid #ccc;}
	#inner{ position: relative;  width: 500px; height: 200px; overflow: hidden;}
	#inner ul{ position: absolute; left: 0; top: 0; width: 600%;  }
	#inner ul li{ float: left; }
	#inner ol{ position: absolute; right: 10px; bottom: 10px;}
	#inner ol li{ background-color: rgba(169,169,169,0.7); ;border: 1px solid #ccc; width: 5px; height: 5px; text-align: center; float: left; margin-left: 10px;border-radius: 50%; border: 3px solid #000;opacity: 0.5}
	#inner ol li.current{background: #ccc;opacity: 0.7}
	#inner div{ display: none;}
	#inner div span{ width:40px; height:40px; position:absolute; left:5px; top:50%; margin-top:-20px; background:#000; cursor:pointer; font: bold 30px/40px '黑体';text-align:center; color:#fff; opacity:0.3; border:1px solid #fff; }
    #inner #right{ right:5px; left:auto; }
</style>
<body>
<div id="box">
	<div id="inner">
		<ul id="ul">
			<li><img src="images/1.jpg" width="500" height="200" /></li>
	        <li><img src="images/2.jpg" width="500" height="200" /></li>
	        <li><img src="images/3.jpg" width="500" height="200" /></li>
	        <li><img src="images/4.jpg" width="500" height="200" /></li>
	        <li><img src="images/5.jpg" width="500" height="200" /></li>
		</ul>
		<ol>
		</ol>
		<div>
			<span><</span>
			<span id='right'>></span>
		</div>
	</div>
</div>

<script type="text/javascript">
	var box=document.getElementById('box')
	var inner=document.getElementById('inner')
	var ul=inner.firstElementChild;
	var ulLi=ul.children;
	var ol=inner.children[1]
	var olLi=ol.children;
	var div=inner.lastElementChild;
	var span=div.children;
	var imgWidth=ulLi[0].offsetWidth;
	var newLi=ul.firstElementChild.cloneNode(true)
	ul.appendChild(newLi)
	for(var i=0;i<ulLi.length-1;i++){
		var newOlLi=document.createElement('li')
		ol.appendChild(newOlLi);
	}
	olLi[0].className='current'
    for(var i=0;i<ulLi.length-1;i++){
    	olLi[i].index=i
    	olLi[i].onmouseover=function(){
    		for(var j=0;j<ulLi.length-1;j++){
    			olLi[j].className=""
    		}
    		this.className='current';
    		key=square=this.index;
    		animate(ul,-this.index*imgWidth)
    	}
	}
	var key=0;
	var square=0;
	function autoPlay(){
		key++;
		if(key>5){
			ul.style.left=0;
			key=1;
		}
		square++
		for(var j=0;j<ulLi.length-1;j++){
			olLi[j].className=""
		}
		if(square>4){
			square=0;
		}
		olLi[square].className="current"
		animate(ul,-key*imgWidth)
	}
	var timer1
	box.onmouseout=function(){
		timer1=setInterval(autoPlay,1000)
		div.style.display='none'
	}
	box.onmouseover=function(){
		clearInterval(timer1)
		div.style.display='block'
	}
	span[0].onclick=function(){
		key--;
		if(key<0){
			key=4;
			ul.style.left=-5*imgWidth+'px';
		}
		square--;
		if(square<0){
			square=4;
		}
		for(var j=0;j<ulLi.length-1;j++){
			olLi[j].className=""
		}
		olLi[square].className="current"

		animate(ul,-key*imgWidth)
	}
	span[1].onclick=autoPlay;
	function animate(ele,target){
		clearInterval(ele.timer);
		speed=target>ele.offsetLeft?10:-10;
		ele.timer=setInterval(function(){
			var val = target - ele.offsetLeft;
			ele.style.left=ele.offsetLeft+speed+'px'
			if(Math.abs(val)<Math.abs(speed)){
				ele.style.left=target+'px';
				clearInterval(ele.timer);
			}
		},10)
	}
</script>
</body>
</html>
```