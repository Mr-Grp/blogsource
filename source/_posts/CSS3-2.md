---
title: CSS3(2)
date: 2017-10-16 20:22:56
tags: [CSS3,前端]
categories: CSS3
---
## 1.border ##
### 1.1 圆角 ###
border-radius

1.四个位置：水平 竖直

```
border-top-left-radius: 60px 120px;
border-top-right-radius: 60px 120px;
border-bottom-left-radius: 60px 120px;
border-bottom-right-radius: 60px 120px;
```
2.复合写法
前四个为四个位置水平，后四个为竖直。
``` 
border-radius: 60px 60px 60px 60px/ 120px 120px 120px 120px ;
```
3.简写
四个角一样：
`border-radius: 60px/120px;`
水平竖直一样时：
`border-radius: 60px;` 

### 1.2 盒子阴影  ###
box-shadow
水平位移 垂直位移  模糊程度  阴影大小 阴影颜色 外/内阴影(inset)  外阴影不用写 
`box-shadow: 15px 21px 48px -2px #666`

### 1.3 边框图片 ###

`border-image-source: url("images/border.png");`
`border-image-slice: 27;`

图片边框的宽度:
`border-image-width: 27px;`
边框图片的平铺:
repeat :正常平铺 但是可能会显示不完整
round: 平铺 但是保证 图片完整
stretch: 拉伸显示
`border-image-repeat: stretch;`

## 2.背景 ##

### 2.1 背景尺寸 ###
1.控制背景的大小
具体数值
background-size: 500px 500px;
 百分比
background-size:50% 50%;

cover  覆盖   
contain 包含
cover 会保证完全覆盖盒子，但不能保证完整显示
`background-size:cover;`

### 2.2 背景原点 ###
`background-origin: padding-box;`
`background-origin: border-box;`
`background-origin: content-box;`

### 2.3 背景裁剪 ###
border-box :从 border-box开始裁剪
padding-box :从 padding-box开始裁剪
content-box :从 content-box开始裁剪
` background-clip:content-box;`

### 2.4 多背景 ###
```
background: url(images/bg1.png) no-repeat left top
            ,url(images/bg2.png) no-repeat right top
            ,url(images/bg3.png) no-repeat right bottom
            ,url(images/bg4.png) no-repeat left bottom
            ,url(images/bg5.png) no-repeat center;
```
加逗号隔开即可，相应位置也可以多个。

## 3.渐变 ##
### 3.1 线性渐变  ###
linear-gradient(方向，起始颜色，终止颜色);
方向：to left   to right  to top   to bottom 　角度(30deg)
竖直向上为0°，顺时针
` background-image: linear-gradient(yellow ,green);`
` background-image: linear-gradient(to right,yellow ,green);`
` background-image: linear-gradient(135deg,yellow,green);`

多颜色：
```
background-image: linear-gradient(to right,
                yellow 0% ,
                red 40% ,
                green 70% ,
                blue 100%);
```
突变
```
background-image: linear-gradient(45deg,
    yellow 0%,
    yellow 25%,
    blue 25%,
    blue 50%,
    red 50%,
    red 75%,
    green 75%,
    green 100%
);
```
### 3.2 径向渐变 ###
radial-gradient（辐射半径 中心的位置，起始颜色，终止颜色）;
中心点位置：at  left  right  center bottom  top
左上角为参考点
` background-image: radial-gradient(at left top,yellow,green);`
`background-image: radial-gradient(100px at center,yellow ,green);`
`background-image: radial-gradient(at 50px 50px,yellow,green);`
```
background-image: radial-gradient(100px at center,
            yellow 0% ,
            green 30%,
            blue 60%,
            red 100%);
```

## 4.过渡 ##
transition:

transition-property
如果希望所有的属性都发生过渡 使用过all
transition-property: all;
transition-duration
transition-delay
transition-timing-function
ease ease-in ease-out ease-in-out liner

常用
`transition: all 1；`
效果：小米商城特效


## 5. 2D变换 ##
transform
transform-orign: 变换中心，默认中心点，可设置，水平 垂直
### 5.1 缩放 ###
scale(水平放缩比例，垂直放缩比例)；
大于1：放大
小于1：缩小
如果只写一个值等比例缩放
`transform: scale(2,0.5);`

### 5.2 位移 ###
translate:(水平位移，垂直位移)；
正值：向右向下
负值：向左向上
如果只写一个值 水平移动
百分比 ：相对于自身移动

定位盒子居中：
在50%处，左移自己宽度一般，写一个只算一个
` transform:translate(-50%);`

### 5.3 旋转 ###
rotate（角度 deg） 旋转
正值 顺时针
赋值：逆时针

不显示背面
`backface-visibility: hidden;`

### 5.4 倾斜 ###
skew(0deg,0deg);
X倾斜角度，Y倾斜角度

在css获取属性
`content:attr(data-text);`  即属性名


效果：可以用变换打乱，再transform:none，配合transition