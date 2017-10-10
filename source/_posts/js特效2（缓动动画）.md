---
title: js特效（结构）
date: 2017-10-05 19:29:56
tags: [blog,javascript,特效]
categories: js特效
---

## 1.第二家族 scroll ##
### 1.1 scrollWidth/scrollHeight ###
内容的宽高
scrollWidth和scrollHeight不包括border和margin
IE67可以比盒子小。 IE8+火狐谷歌不能比盒子小
高度有一个特点：如果文字超出了盒子，高度为超出盒子的内容的高。不超出是盒子本身高度
IE8以下，不包括IE8为盒子本身内容的多少。

### 1.2 scrollLeft/scrollTop ###
被卷去的左侧和头部（浏览器无法显示的左/头部）

#### 1.2.1兼容性问题 ####
1.未声明 DTD（谷歌只认识他）（IE9+认识他）
document.body.scrollTop

2.已经声明DTD（IE678只认识他）(IE9+任何时候)
   document.documentElement.scrollTop

3.火狐/谷歌/ie9+以上支持的(不管DTD)
   window.pageYOffset

#### 1.2.2 解决 ####
为了兼容，不管有没有 DTD，可以使用如下代码：
```
var scrollTop = window.pageYOffset
                || document.documentElement.scrollTop  
                || document.body.scrollTop；  
               

var scrollTop =  document.documentElement.scrollTop  
                + document.body.scrollTop；
```
#### 1.2.3 检查DTD ####

document.compatMode
BackCompat  未声明
CSS1Compat  已经声明
IE678默认识别CSS1Compat ，无论有没有dtd
注意大小写

#### 1.2.4 封装 ####
```
function scroll(){
	return {
       "top": window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
       "left":  window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
     }
}
```


### 1.3 onscroll ###
滚动事件
1.屏幕每滚动一次，哪怕只有1像素都会触发这个事件。这样就可以用来检测屏幕滚动了。  

2.只能有一个写了多个以最后一个为准

### 1.4 window.scrollTo  ###
scrollTo(xpos,ypos)
xpos	必需。要在窗口文档显示区左上角显示的文档的 x 坐标。
ypos	必需。要在窗口文档显示区左上角显示的文档的 y 坐标

## 2.缓动动画（对offset补充） ##
动画原理 = 盒子位置 + 步长（步长越来越小）。
盒子位置 = 盒子本身位置+（目标位置-盒子本身位置）/ 10；
公式：     leader = leader + (target - leader)  / 10;
大于0向上取整，小于0向下取整
出口：    
```
if(Math.abs(target-ele.offsetLeft)<=Math.abs(step)){
                //处理小数赋值
                ele.style.left = target + "px";
                clearInterval(ele.timer);
            }
```

实例效果
<a href='/html/js2_1.html' target='_blank'>特效演示</a>

导航栏鼠标效果+导航栏固定+广告跟随+返回顶部+缓动效果
代码：

```
---
layout: false
---
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
</head>
<style type="text/css">
*{ padding: 0; margin: 0; border: 0; list-style: none; }
	body{
		background:#ccc;
	}
	#header{
		height: 100px;
		background: blue;
		color:white;
		font:bold 30px/100px '黑体';
		text-align: center;
	}
	#section{
		width: 1000px;
		height: 5000px;
		background: #999;
		color:white;
		font:bold 30px/100px '黑体';
		text-align: center;
		margin: auto;
	}
	#nav{
		
		height: 50px;
		margin:auto;
		overflow: hidden;
		background: #fff;
		border-radius: 10px;
		position: relative;
	}
	#nav span{
		width: 83px;
        height: 42px;
		background:url("images/cloud.gif") no-repeat ;
	    position: absolute;
        left: 0;
        top: 0;
	}
	#nav ul{
		position: absolute;	
		width: 600px;
		height: 50px;
		overflow: hidden;
	}
	#nav ul li{
		width: 100px;
		height: 50px;
		float: left;
		line-height: 50px;
		text-align: center;
		cursor: pointer;
	}
	#nav.fixed{
		position: fixed;
		width: 1500px;
		top:0;
	}
	#aside{
		width: 150px;
		height: 300px;
		background-color: pink;
		position: absolute;
		right: 10px;
		top:200px;
		color:white;
		font:bold 30px/100px '黑体';
		text-align: center;
	}
	#back{
		background-color: black;
		color:white;
		font:bold 30px/60px '黑体';
		text-align: center;
		width: 50px;
		height: 60px;
		position: fixed;
		right: 20px;
		bottom: 30px;
		cursor:pointer;
		display: none;
	}
</style>
<body>
<div id='header'>
	this is header
</div>
<div id='nav'>
	<span id='cloud'></span>
	<ul id='ul'>	
		<li>1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
		<li>5</li>
		<li>6</li>
	</ul>
</div>
<div id='section'>
	this is content
	<br>
	this is content <br>
	<br>
	this is content
</div>
<div id="aside">这是广告</div>
<div id="back">Top</div>



<script type="text/javascript">
	var back=document.getElementById('back');
	var aside=document.getElementById('aside');
	var content=document.getElementById('section');
	var nav=document.getElementById('nav');
	var span=document.getElementById('cloud');
	var ul=document.getElementById('ul');
	ulLi=ul.children;
	var current=0;
	for(var i=0;i<ulLi.length;i++){
		ulLi[i].onmouseover=function(){
			animate(span,this.offsetLeft);
		}
		ulLi[i].onmouseout=function(){
			animate(span,current);
		}
		ulLi[i].onclick=function(){
			current=this.offsetLeft;
		}
	}
	onscroll=function(){
		if(scroll().top>=100){
			nav.className='fixed';
			content.style.marginTop='50px';
		}
		if(scroll().top<100){
			nav.className='';
			content.style.marginTop='0';
		}
		animateTop(aside,scroll().top+200);
		if(scroll().top>1000){
			back.style.display='block';
		}

	}
	var timer = null;
	var target=0;
	var leader=0;
	top.onclick=function(){
		timer = setInterval(function(){
			var  speed=(target-scroll().top)/10;
			leader=scroll().top+speed;
			scrollTo(0,leader);
			if(Math.abs(target-scroll().top)<=Math.abs(speed)){
				scrollTo(0,0);
				clearInterval(timer);
			}
		},10);
	}
	function animate(ele,target){
		clearInterval(ele.timer);
		ele.timer=setInterval(function(){
			var  speed=(target-ele.offsetLeft)/10;
			ele.style.left=ele.offsetLeft+speed+'px';
			if(Math.abs(target-ele.offsetLeft)<=Math.abs(speed)){
				ele.style.left=target+'px';
				clearInterval(ele.timer);
			}
		},10);
	}
	function animateTop(ele,target){
		clearInterval(ele.timer);
		ele.timer=setInterval(function(){
			var  speed=(target-ele.offsetTop)/10;
			ele.style.top=ele.offsetTop+speed+'px';
			if(Math.abs(target-ele.offsetTop)<=Math.abs(speed)){
				ele.style.top=target+'px';
				clearInterval(ele.timer);
			}
		},10);
	}
	function scroll(){
	return {
       "top": window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
       "left":  window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
     }
}

</script>
</body>
</html>
```