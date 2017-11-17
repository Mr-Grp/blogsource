---
title: CSS基础(3)
date: 2017-10-09 16:54:59
tags: [CSS3,前端]
categories: CSS3
---
## 1.补充 ##
### 1.1标签包含规范 ###
div可以包含所有的标签。
p标签不能包含div h1等标签。
h1可以包含p，div等标签。
行内元素尽量包含行内元素，行内元素不要包含块元素。

### 1.2 规避脱标流 ###
尽量使用标准流。
标准流解决不了的使用浮动。
浮动解决不了的使用定位。

### 1.3 图片和文字垂直居中对齐 ###
vertical-align对inline-block最敏感。默认属性是:vertical-align:baseline;

### 1.4 Css可见性 ###
overflow:hidden;   溢出隐藏    
visibility:hidden;   隐藏元素    隐藏之后还占据原来的位置。
display:none;      隐藏元素    隐藏之后不占据原来的位置。
Display:block;     元素可见
Display:none  和display:block  常配合js使用。

### 1.5 内容移除 ###
text-indent:-5000em;
将元素高度设置为0,使用内边距将盒子撑开，给盒子使用overflow:hidden;将文字隐藏。

