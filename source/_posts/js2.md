---
title: js基础语法(2)
date: 2017-10-03 16:30:52
tags: [javascript,前端]
categories: javascript
---

## 1.js内置对象
### 1.1 Array对象 ###
var  变量=[值1，值2，值3]
var  变量=new Array([值1，值2，值3])

1.数组取值，赋值
变量[下标];
变量[下标]=新的值;
可以是多维数组，数组中的项是数组即可。

2.属性
length

3.方法（常用）
pop() 删除数组最后一项并返回
push(参数) 加入新的内容
join(参数) 用参数将数组连接成字符串返回，参数可以是""
concat(数组) 连接数组组成新的数组 
reverse() 反转数组顺序
其他方法查阅手册。

### 索引数组 ###
JS本质上没有关联索引数组 但是支持下标为字符串的数组元素 也就相当于是关联索引的数组，在打印数组和计算数组长度时都不包含关联索引部分的元素

#### 数组遍历 ####

可以使用for循环数组的下标 然后去数组元素 下标的范围是[0, arr.length-1]。该方法只能打印出所有的数字下标元素 且要求数组元素是连续的 否则 会产生undefined值。

### 1.2 String对象 ###

1.属性
length

2.常用方法
charAt(index) 返回索引位置的值
charCodeAt(index)  返回编码值
indexOf(字符) 返回第一次出现的位置，不存在-1
lastIndexOf(字符) 返回最后一次出现的位置，不存在-1
split(参数) 用参数将字符串分割成数组
substr(n,m) 从n开始截取m个
substring(n,m) 从n截取到m
如果只有一个参数，截取到最后
toLowerCase()
toUpperCase()
其他方法查阅手册。

### 1.3 Math对象 ###
1.常用方法：
pow(a,b) a的b次方
abs(n) n的绝对值
round(n) 四舍五入
ceil(n) 向上取整
floor(n) 向下取整
random() 0-1之间随机数（取不到1）
其他方法查阅手册。

2.随机数具体用法：Math.floor(Math.random()*(大数-小数+1)+小数)

### 1.4 Date对象 ###
new Date() 获取当前时间

1.常用方法：
toLocaleString()   注意有个e
getFullYear()  四位的年
getMonth() 月 0-11
getDate()  日  1-31
getHours() 小时 0-23
getMinutes() 分钟 0-59
getSeconds() 秒 0-59
getMilliseconds() 毫秒
getDay() 一周中的某一天
getTime() 时间戳

其他方法查阅手册。

## 2.BOM对象 ##
![](/images/js/2.png)

### 2.1 window ###
#### 2.1.1innerWidth, innerHeight ####
窗口有效宽高

#### 2.1.2 弹出消息方法：alert(), prompt(), confirm() ####
window.alert(“内容”) 弹出一个提示信息
window.prompt(“提示信息”)；  弹出一个输入框
window.confirm(“确认的信息”); 

#### 2.1.3窗口开关方法：open()，close() ####
+	window.open(“url”,”name”，”options”)
url 窗口中显示的内容
name 给链接中target用的
options 窗口的参数
width 窗口的宽度 height 窗口的高度，left窗口距屏幕的左边距离 ，top距上边的距离等

+	window.close()
js打开才能用这个关。

### 2.1.4定时器 ###
window.setTimeout(“函数名()”,毫秒);
window.setInterval(“函数名()”,毫秒)

清除定时器：clearTimeout(), clearInterval()

### 2.2 screen ###
width，height 屏幕宽高
availWidth，availHeight
其他需要时可查阅手册

### 2.3 navigation ###
appName
appCodeName
userAgent
appVsersion
其他需要时可查阅手册

### 2.4 history ###
length 浏览过的url数量
back() 上一个
go(-1)
forward() 下一个
go(1)
go(0) 刷新 
其他需要时可查阅手册

### 2.5 location ###
href 当前url
reload() 重新加载
assgin(url) 
repalce(url) 没历史
其他需要时可查阅手册