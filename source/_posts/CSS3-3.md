---
title: CSS3(3)
date: 2017-10-17 14:40:16
tags: [CSS3,前端]
categories: CSS3
---
## 1. 3D变换 ##
transform

### 1.1 透视 ###
透视 :加给变换的父盒子，置的是用户的眼睛距离 平面的距离
`perspective: 100px;`

所有的3d旋转，对着正方向去看，都是顺时针旋转
``` 
transform:rotateX(360deg);
transform:rotateY(360deg);
transform:rotateZ(360deg);

transform:translateX(360px);
transform:translateY(360px);
transform:translateZ(360px);
```

透视设置的用户眼睛和屏幕的距离仅仅只是视觉呈现出3d效果，并不是正真的3d，只是平面的近大远小。

### 1.2 3D ###
可以让里面的子盒子保持3d 效果，加给父盒子preseve-3d，让子盒子位于3d空间里面。
` transform-style:preserve-3d;`


## 2. 动画 ##
CSS3中的动画：

### 2.1 定义动画 ###
```
    @keyframes 动画名{
        from{ 初始状态}
        to{结束状态}
    }
```
定义多组动画
```
@keyframes gun {
        0%{
            1
        }
       50%{
            2
       }
       100%{
       		3
       }
```

### 2.2 调用 ###
调用：基本语法格式
`animation: 动画名称 持续时间；`
前两属性是必须，且顺序固定

+	动画名称`animation-name: move;`
+	动画时间`animation-duration: 3s;`
+	动画执行次数`animation-iteration-count: 1;`无数次：`infinite`
+	动画的方向：`animation-direction: alternate;` normal 正常 ， alternate： 往返
+	动画延迟执行`animation-delay: 1s;`
+	设置动画结束盒子盒子的状态`animation-fill-mode:forwards;`
forwards：保持动画结束后的状态
backwards：保持动画开始前的状态
+	运动曲线`animation-timing-function:ease-in;`  linear   ease-in-out
steps()，动画分几步完成（钟表等应用）

### 2.3 播放暂停 ###
`animation-play-state: paused;`
控制动画状态 paused 暂停  running　播放*/


## 3.多列布局 ##
列数`column-count: 3;`
设置分栏间距`column-gap: 50px;`
设置分割线的颜色`column-rule: 1px dashed red;`
设置分栏的宽度`column-width:200px`太宽会减少列数，宽度会平分

内容：
跨列 `column-span`

注意兼容性问题