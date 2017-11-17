---
title: HTML5(2)
date: 2017-10-12 10:20:57
tags: [前端,HTML5]
categories: HTML5
---
## 1.拖拽 ##
draggable="true"

### 1.1拖拽元素 ###
ondragstart: 拖拽开始
ondragend:拖拽结束
ondragleave: 当鼠标拖拽离开 被拖拽元素时
ondrag:　当拖拽时，持续触发

### 1.2 目标元素###
ondragenter:当被拖拽元素进入目标元素时
ondragleave:当鼠标进入目标元素时
ondragover: 当被拖拽元素在目标元素上时，持续触发
需要e.preventDefault(); 阻止拖拽的默认行为；
ondrop:当在目标元素上松开鼠标时触发；

## 2.地理位置 ##
在HTML规范中，增加了获取用户地理信息的API，这样使得我们可以基于用户位置开发互联网应用，即基于位置服务 (Location Base Service)

navigator.getCurrentPosition(successCallback, errorCallback, options) 获取当前地理信息

1、当成功获取地理信息后，会调用succssCallback，并返回一个包含位置信息的对象position.Coords(坐标)
position.coords.latitude纬度
position.coords.longitude经度

2、当获取地理信息失败后，会调用errorCallback，并返回错误信息error

3、可选参数 options 对象可以调整位置信息数据收集方式

扩充：百度地图API，百度一下.
例子：
```
if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
        }else{
            console.log('sorry,你的浏览器不支持地理定位');
        }
function successCallback(position){
            var wd=position.coords.latitude;
            var jd=position.coords.longitude;
            console.log("获取用户位置成功！");
            console.log(wd+'-'+jd);
        }
        function errorCallback(error){
            console.log(error);
            console.log('获取用户位置失败！')
        }
```

## 3.web存储 ##
随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，传统方式我们以document.cookie来进行存储的，但是由于其存储大小只有4k左右，并且解析也相当的复杂，给开发带来诸多不便，HTML5规范则提出解决方案。

### 3.1 会话存储 ###
5MB
生命周期为关闭浏览器窗口
在同一个窗口下数据可以共享
window.sessionStorage

### 3.2 本地存储 ###
永久生效，除非手动删除
可以多窗口共享
20MB
window.localStorage

### 3.3 方法 ###
setItem(key, value) 设置存储内容
getItem(key) 读取存储内容
removeItem(key) 删除键值为key的存储内容
clear() 清空所有存储内容
key(n) 以索引值来获取存储内容

## 4.全屏 ##
1.HTML5规范允许用户自定义网页上任一元素全屏显示。
requestFullscreen() 开启全屏显示
cancleFullscreen() 关闭全屏显示

2.不同浏览器需要添加前缀如：
webkitRequestFullScreen
mozRequestFullScreen
webkitCancleFullScreen
mozCancleFullScreen

3.通过document.fullScreen检测当前是否处于全屏
不同浏览器需要添加前缀
document.webkitIsFullScreen、document.mozFullScreen

4.全屏伪类
:full-screen .box {}、:-webkit-full-screen {}、:-moz-full-screen {}
兼容写法：
```
var box=document.querySelector('.box');
box.onclick=function(){
    if(box.requestFullscreen){
       	box.requestFullscreen();
    }else if(box.webkitRequestFullScreen){
        box.webkitRequestFullScreen();
    }else if(box.mozRequestFullScreen){
        box.mozRequestFullScreen();
    }
}

```

## 5.网络状态 ##
window.online用户网络连接时被调用
window.offline用户网络断开时被调用
```
window.addEventListener("online",function(){
         alert("已经建立了网络连接")
    })
window.addEventListener("offline",function(){
         alert("已经失去了网络连接")
   })
```

## 6.应用缓存 ##
HTML5中我们可以轻松的构建一个离线（无网络状态）应用，只需要创建一个cache manifest文件。

### 6.1 好处 ###
+	可配置需要缓存的资源
+	网络无连接应用仍可用
+	本地读取缓存资源，提升访问速度，增强用户体验
+	减少请求，缓解服务器负担

### 6.2 创建 ###
一个普通文本文件，其中列出了浏览器应缓存以供离线访问的资源，推荐使用.appcache为后缀名，添加MIME类型.

例如我们创建了一个名为demo.appcache的文件，然后在需要应用缓存在页面的根元素(html)添加属性manifest="demo.appcache"，路径要保证正确。

### 6.3 格式 ###
manifest文件格式
顶行写CACHE MANIFEST
CACHE: 换行 指定我们需要缓存的静态资源，如.css、image、js等
NETWORK: 换行 指定需要在线访问的资源，可使用通配符
FALLBACK: 当前页面无法访问时退回的页面(回退;  后退)
注释: #

```
CACHE MANIFEST

CACHE:
    images/img1.jpg
    images/img2.jpg
    
NETWORK:
     images/img3.jpg
     images/img4.jpg

FALLBACK:
    404.html

```