---
title: HTML5(1)
date: 2017-10-11 22:12:00
tags: [前端,HTML5]
categories: HTML5
---
## 1.介绍 ##

### 1.1 HTML5 ###
HTML5  是html4.0 升级版
结构 Html5 
样式 css3 
行为: API  都有所增强 

HTML5并不仅仅只是做为HTML标记语言的一个最新版本，更重要的是它制定了Web应用开发的一系列标准，成为第一个将Web做为应用开发平台的HTML语言。

HTML5定义了一系列新元素，如新语义标签、智能表单、多媒体标签等，可以帮助开发者创建富互联网应用，还提供了一些Javascript API，如地理定位、重力感应、硬件访问等，可以在浏览器内实现类原生应用，甚至结合Canvas我们可开发网页版游戏。

广义概念：HTML5代表浏览器端技术的一个发展阶段。在这个阶段，浏览器呈现技术得到了一个飞跃发展和广泛支持，它包括：HTML5，CSS3，Javascript，API在内的一套技术组合 

### 1.2 语义规范 ###
HTML5在语法规范上也做了比较大的调整，去除了许多冗余的内容，书写规则更加简洁、清晰。
特点：
1、更简洁
2、更宽松
单标签不用写关闭符号
双标签省略结束标签
html、head、body等可以完全省略	

## 2.语义标签 ##
语义标签对于我们并不陌生，如`<p>`表示一个段落`<ul>`表示一个无序列表`<h1> ~ <h6>`表示一系列标题等，在此基础上HTML5增加了大量更有意义的语义标签，更有利于搜索引擎或辅助设备理解HTML页面内容。

传统的做法我们或许通过增加类名如class="header"、class="footer"，使HTML页面具有语义性，但是不具有通用性。

HTML5则是通过新增语义标签的形式来解决这个问题，例如`<header></header>、<footer></footer>`等，这样就可以使其具有通用性。
```

H5 经典网页布局:
<!-- 头部 -->
<header>
  <ul class="nav"></ul>
</header>
<!-- 主体部分 -->
<section>
    <aside>侧边栏</aside>
    <article>文章</article>
</section>
<!-- 底部 -->
<footer></footer>
```
### 2.1 常用语义标签 ###
```
<nav> 表示导航
<header> 表示页眉
<footer> 表示页脚
<section> 表示区块
<article> 表示文章 如文章、评论、帖子、博客
<aside> 表示侧边栏 如文章的侧栏
<figure> 表示媒介内容分组 与 ul > li 做个比较
<mark> 表示标记 (带用“UI”，不怎么用)
<progress> 表示进度 (带用“UI”，不怎么用)
<time> 表示日期
```
本质上新语义标签与<div>、<span>没有区别，只是其具有表意性，使用时除了在HTML结构上需要注意外，其它和普通标签的使用无任何差别

### 2.2 兼容性处理 ###
在不支持HTML5新标签的浏览器里，会将这些新的标签解析成行内元素(inline)对待，所以我们只需要将其转换成块元素(block)即可使用，但是在IE9版本以下，并不能正常解析这些新标签，但是却可以识别通过document.createElement('tagName')创建的自定义标签，于是我们的解决方案就是将HTML5的新标签全部通过document.createElement('tagName')来创建一遍，这样IE低版本也能正常解析HTML5新标签了，在实际开发中我们更多采用的是通过检测IE浏览器的版本来加载三方的一个JS库来解决兼容问题。

```
<!--[if lte ie 8]>
	<script src="html5shiv.min.js"></script>
<![endif]-->
```

## 3.表单 ##

### 3.1 输入类型 ###
email 输入email格式
tel 手机号码  
url 只能输入url格式
number 只能输入数字
search 搜索框
range 范围 滑动条
color 拾色器
time	时间
date 日期 不是绝对的
datetime 存在兼容性问题
datetime-local时间日期
month 月份
week 星期
部分类型是针对移动设备生效的，且具有一定的兼容性，在实际应用当中可选择性的使用。

### 3.2 表单元素 ###
```
<datalist> 数据列表
  与input 配合使用
  <input type=”text” list=”data”>
 <datalist id=”data”>
 <option>男</option>
 <option>女</option>
 <option>不详</option> 
</datalist>
<output></output>  输出信息
<meter>   max   min  value  low  high 表示度量器，不建议用作进度条
<progress></progress> 进度条 max   min  value
<keygen>  生成加密字符串
```
keygen 元素  

keygen 元素的作用是提供一种验证用户的可靠方法。 
keygen 元素是密钥对生成器（key-pair generator）。当提交表单时，会生成两个键，    一个是私钥，一个公钥。 
私钥（private key）存储于客户端，公钥（public key）则被发送到服务器。公钥可用于之后验证用户的客户端证书（client certificate）。

元素属性：
Max-width   
Min-width 

### 3.3 表单属性 ###
placeholder:提示文字
autofocus:自动聚焦
autocomplete：自动完成（填充）  on 开启（默认）   off 取消提示
required:必填
multiple: 多选
novalidate: 关闭表单的默认验证功能 用于form
pattern:  自定义正则验证 pattern="\D+";

表单事件：
oninput:当用户输入时 触发
oninvalid:当验证不通过是触发-->设置验证不通过时的提示文字
this.setCustomValidity('设置提示信息');

## 4.多媒体 ##
在网页上播放 多媒体 必须依赖于第三方 插件

H5里面提供了 视频 和 音频的标签
audio  
video
属性：autoplay controls loop src
```
<!--  行内块 display:inline-block -->
<!--推荐的兼容写法：-->
<audio controls loop>
    <source src="music/yinyue.mp3"/>
    <source src="music/yinyue.ogg"/>
    <source src="music/yinyue.wav"/>
    抱歉，你的浏览器不支持音频标签！
</audio>
```
```
<video controls autoplay>
    <source src="video/movie.mp4"/>
    <source src="video/movie.ogg"/>
    <source src="video/movie.webm"/>
    抱歉，浏览器要换了！
</video>
```
### 4.1 自定义视频样式 ###
查看文档video相关属性接口。
currentTime
duration
paused 返回布尔值
play()
pause()
oncanplay
ontimeupdate
onended
requestFullscreen()存在兼容问题，下一章说

## 5.DOM扩展 ##
在H5中 DOM新增的功能：

1.获取单个元素：
document.querySelector('.box‘);

2.获取所有符合条件的元素：  返回的数组
document.querySeletorAll('.box');

3.控制类名的API：
node.classList.add();添加类名
node.classList.remove()；删除类名
node.classlist.contains();判断是否包含指定的类名
node.classList.toggle()；切换指定的类名

4.自定义属性:
data-name
获取
.dataset['name'] 