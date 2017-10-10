---
title: css基础2
date: 2017-10-02 12:45:13
tags: [blog,css,前端]
categories: css
---
##	1.Css属性（常用）
###	1.1 字体
```
font-style: italic/normal;
font-weight: bold/normal;
font-size: 20px;
font-family: '宋体';
line-height:20px;
```
或者
`font: font-style font-weight  font-size/line-height  font-family;`
顺序固定
文字大小和字体为必写项！
unicode 编码

![](/images/css/编码.png)

###	1.2 文本

Color  文本的颜色 color:red;  
text-decoration:underline; 加下划线 text-decoration:none; 去掉下划线 ，line-through 横穿
line-height ：行高 line-height:24px;  
text-indent : text-indent:2em;  缩进
letter-spacing :所有的字符字母间距
word-spacing:字间距
text-align

```
color: red;
text-decoration: underline/none;
text-height: 30px;
text-indent: 50px;缩进
letter-spacing: 30px;字符间距
word-spacing: 10px;单词间距
text-align: right;
```

#### 行高
浏览器默认文字大小：16px
行高：是基线与基线之间的距离
行高=文字高度+上下边距

![](/images/css/行高.png)

不带单位时，行高是和子元素文字大小相乘，em和%的行高是和父元素文字大小相乘。行高以像素为单位，就是定义的行高值。

###	1.3 列表
list-style-type : none; 去掉列表前面的符号 
list-style-image：url(图片的地址)
list-style：none;
list-style:url(图片的地址);

###	1.4 背景
background-color:颜色值;
background-image :url(图片的地址); 
backgrond-repeat : repeat//repeat-x//repeat-y//no-repeat;
background-attachment ：fixed//scroll ;
background-position: top/bottom/-x  left/right/-y背景图片展开的位置,(非数值可颠倒)


background：颜色 背景图片  是否平铺 附件 水平 垂直;
url为必写项。

###	1.5 尺寸
width :数值
height：数值

###	1.6	边框
border-color:颜色值；
border-style:solid; 实线，其他看手册
border-width:数值;

border：粗细数值 线型 颜色
特点：没有顺序要求，线型为必写项。

#### 边框合并 ####
border-collapse:collapse;

### 补充 ###
label  for  id      获取光标焦点
`<label for='id'></label>`

###	1.7	内边距
padding-top :数值;内容和上边框的距离  
padding-right：数值;  
padding-bottom ：数值; 
padding-left:数值;

padding:上 右 下 左;
padding；10px 20px 30px 40px;
padding:10px 20px 30px; 
padding:10px 20px;
padding:20px;


###	1.8	外边距
margin-top :数值; 
marging-right：数值;   
margin-bottom ：数值;
margin-left ：数值;
和内边距一样
margin：10px  20px  30px  40px; 上 右 下 左
margin:10px  30px  5px;  上  （左右） 下；
margin:10px  20px;  /*10px 上下  20px  左右*/
margin:10px;/*上 右  下  左  值相同*/

margin如果多个div都设置了，取得是最大的那个，不是相加


##	2.盒子模型
![](/images/css/box.gif)
盒子一般不会被撑大

box-sizing:boder-box；宽高作用于盒子boder外边框。
box-sizing:content-box；宽高作用于内容。

盒子居中：
margin-left:auto;
margin-right:auto;
简写：margin:auto;

可以通过盒子模型，进行页面的布局。把每一块内容放到不同盒子中，给盒子制定样式，拼成想要的布局。
注意布局之前清除原有样式
`*{margin:0;padding:0;  }`

### 2.1垂直方向外边距合并
两个盒子垂直一个设置上外边距，一个设置下外边距，取的设置较大的值。 

### 2.3外边距塌陷
解决方法:  
1  给父盒子设置边框
2给父盒子overflow:hidden;   [bfc](http://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html)

### 2.4 ###
行内元素可以定义左右的内外边距，上下会被忽略掉

### 2.5 文档流（标准流） ###
元素自上而下，自左而右，块元素独占一行，行内元素在一行上显示，碰到父集元素的边框换行

##	3.浮动
###	3.1 语法
float:left//right;
会脱离标准流，所以要浮动最后一个盒子里面内容都浮动。
如果父盒子没有设置固定的高度，里面的容器如果设置了浮动，浮动不占位置，父盒子没高度。

###	3.2 清除浮动影响
1.clear：left/right/both；（浮动盒子后可加一个`<div>`专用于清除浮动）

2.overflow：hidden；（父盒子中使用这个较好）这个值不会有什么影响，但可以触发显示高度，实际用于内容超出怎么处理。
可选值：
visible	默认值。内容不会被修剪，会呈现在元素框之外。
hidden	内容会被修剪，并且其余内容是不可见的。
scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
inherit	规定应该从父元素继承 overflow 属性的值。

3.:after
```
#parent:after {
content: "";
display: block;
height: 0;
clear: both;
}
兼容ie：
#parent{
	zoom:1;
}
```

###	3.3 display
1.行内元素，不可设置宽高
转换成块元素：display:block/inline-block(可在一行显示块);

2.块元素，可设置宽高，默认宽100%
转换成行内元素：display:inline;

##	4.CSS3新特性
###	4.1 与css2的区别
对css2的扩展和优化 

###	4.2	新增语法
伪类选择器
选择器:first-child  第一项 
选择器:last-child  最后一项
选择器:nth-child(n)  第几项  li:nth-child(2) {  }
选择器:nth-child(2n+1) 奇数项 
选择器:nth-child(even) 奇数项
选择器:nth-child(2n)偶数项 
选择器:nth-child(odd) 偶数项 

###	4.2	新增属性
注意：必须是html5才有
1.text-shadow：水平 垂直 模糊距离 颜色;

2.box-shadow ：水平 垂直  模糊强调  模糊距离  颜色  内/外阴影（inset/outset）
模糊距离  焦距，值越大 ，阴影的范围越大，反之，变小

3.border-radius ：左上 右上  右下  左下 

4.background-size：宽度;  高度值等比例改变
  background-size:宽度值 高度值;

##	5. 定位
###	5.1 static
静态定位，如果不设置默认

###	5.2 fixed
固定定位,固定到浏览器窗口的某个位置
设置完之后，层级高,不占据原来的位置
特点：
+	固定定位之后，不占据原来的位置（脱标）
+	元素使用固定定位之后，位置从浏览器出发。
+	元素使用固定定位之后，会转化为行内块

###	5.3 relative
相对定位
占空间，层级高于普通的元素 ，自身为参考点
特点：
+	使用相对定位，位置从自身出发。
+	还占据原来的位置。
+	子绝父相（父元素相对定位，子元素绝对定位）
+	行内元素使用相对定位不能转行内块

###	5.4	absolute
绝对定位
不占空间，层级高，相对于父盒子而言
z-inde可修改层叠顺序

特点：
元素使用绝对定位之后不占据原来的位置（脱标）
+	元素使用绝对定位，位置是从浏览器出发。
+	嵌套的盒子，父盒子没有使用定位，子盒子绝对定位，子盒子位置是从浏览器出发。
+	嵌套的盒子，父盒子使用定位，子盒子绝对定位，子盒子位置是从父元素位置出发。
+	给行内元素使用绝对定位之后，转换为行内块。

定位结合
top  顶部
right 右边  
bottom 下边  
left   左边


