---
title: js基础语法1
date: 2017-10-03 14:53:42
tags: [blog,javascript,前端]
categories: javascript
---

##	1.简介
###	1.1 什么是JavaScript
Javascript是网景（1994年成立）---livescript，1995的时候网景公司想借助java推广自己的产品，因此改名为javascript，其实和java没啥关系。


###	1.2 JavaScript语言的特点
跨平台：Js是一门跨平台性的脚本语言
基于对象：面向对象
客户端脚本语言：在客户端运行，任何浏览器都可以运行
脚本语言和编程语言的区别：脚本语言不能独立的来完成一项工作，必须要嵌入到其他语言当中去,JavaScript 是可插入 HTML 页面的编程代码

###	1.3 JavaScript基本语法规则
严格区分大小写！

##	2.引入方式
###	2.1 内嵌引入方式
`<标签  事件=”js” >`

###	2.2 内部引入方式
```
<script type=”text/javascript”>
    js代码
</script>
```
### 2.3外部文件引入方式
`<script src=”js文件地址”></script>`
1  写好js代码     存储为  XX.js
2  在 html文件中引入  <script src=”js文件”></script>
3  `<script></script>`之间不允许有空格，换行等字符

##	3.基本语法
### 3.1变量
var 变量名=值
变量可以使用字母、数字、下划线和$，但是必须以字母、下划线和$开头
关键字不能做变量名
Js中严格区分大小写

### 3.2 数据类型
typeof（变量）
1.基本数据类型
+	number
    0x 十六禁止
	0  八进制
+	string
+	boolean
+	undefined 声明一个变量，没有给赋值
+	null 空（object）

2.复杂数据类型
+	object

### 3.3 运算符
1.算数运算符 + - * / %  ++ --
2.赋值运算符: =  +=   -=   *=  /*
3.字符串运算  +  +=
4.比较运算  >  >=  <   <=  !=  ==  ===   
5.逻辑运算  &&  ||  !

### 3.4 运算符优先级
![](/images/js/1.png)

### 3.5 传值方式
1.值传递 （基本的数据类型 number string boolean null 都是值传递）
特点：把值传递给另外一个变量之后，两个变量没有任何关系，一个变量改变，另外一个变量不变。

2.引用传递 (数组 函数  自定义对象)
特点：把值传递给另外一个变量之后，两个变量有关系，一个变量改变，另外一个变量变

###	3.6 变量之间的数据类型转换
+	js自动的转换
“10”+20  ==”1020”
“10”*2====20  把字符转换为number

强制转换
+	Boolean()
  var  n=1;  // true
  var  n=0;  //false
  var  n=10; //true
  var  n=null; //false;
  var  n=””//false
  var  n=”0” //true

+	String()，.toString()
  var n=10;//n=”10”;
  var b=true; //n=”true”
  var c=null; //n=”null”

+	Number()
如果遇到到非数字(整型或浮点型),如果有数以外还有其他的字符 ,不能把数值取出来
  var  m=”10.5” ;//m=10.5;
  var  m=”100px”; //m=NaN    not  a number
  var  m=”px100”; // m=NaN   not  a number
  判断是不是一个数字使用：   isNaN(x)
  Infinity： 无穷大   例如： var   number=7/0 ;
  NaN:  Not  a Number

+	parseInt() 
取出的是整型数： 把整数去出来，不包括小数
  var  aa=parseInt(“100”)  ;//aa=100;
  var  aa=parseInt(“10.555”);//aa=10;
  var  aa=parseInt(“100px”);//aa=100
  var  aa=parseInt(“100px100”);//aa=100
  var  aa=parseInt(“px100”);//aa=NaN
  var  aa=parseInt(“12pxaa123”);//aa=12

+	parseFloat()
取出的是整型数： 把整数去出来，不包括小数
  var  aa=parseFloat(“100”)  ;//aa=100;
  var  aa=parseFloat(“10.555”);//aa=10.555;
  var  aa=parseFloat(“100px”);//aa=100
  var  aa=parseFloat(“100px100”);//aa=100
  var  aa=parseFloat(“px100”);//aa=NaN
  var  aa=parseFloat(“.99”);//aa=0.99

##	4.流程控制
### 4.1 顺序结构 ###
自上而下

### 4.2 分支结构 ###
+	单分支if
```
if(判断的条件){
  代码块; 成立 
}
```
+	双分支 if-else  
```
 if(判断条件){
  条件成立 ，代码1
}else{
   不成立 ，代码2
}	
```
+	多分支else—if
```
 if(判断条件){
  条件成立 ，代码1
}else if(判断条件){
  条件成立 ，代码2
}else{
   不成立 ，代码3
}
```
+	switch分支语句
```
switch(条件表达式 通常是变量){
  case 值1：
   语句1;
   break;
  case 值2：
语句2;
break;
  …
   default:
上面的条件都不满足，执行该语句;
break;
}
```
### 4.3 循环结构 ###
+	while语句形式
```
变量初始化
while(判断条件){
    成立 循环体;
    变量的更新;
}
```
+	do while
会先执行一次循环体
```
变量初始化
do{
    成立 循环体;
    变量的更新;
}while(判断条件)
```
+	break和continue的使用
break退出的相关的所有的循环
continue  退出当前的循环

+	for循环语句
```
for(变量的初始化;判断条件;变量的更新){
成立 循环体;
如果不成立 ，不执行该循环体;
}
```

## 5.函数 ##
将一段功能代码进行封装，起个名字

### 5.1 函数的定义及调用 ###
function 函数名（形参1，形参2…）{
   函数体;
}
函数名 （实参1，实参2…）
实参是直接值，通常是常量，实参和形参要一一对应

### 5.2函数的返回值 ###
return xx；
将结果返回给函数的调用的位置，退出函数

### 5.3 作用域 ###
函数的作用域 ,变量是在函数里面声明的还是在函数的外部声明的
1.局部变量：在函数内部声明的变量是局部变量,只能在函数内部使用
2.全局变量：在函数外部声明的变量，哪都能用

## 6.运行过程 ##
在javascript中，程序执行的过程是从上而下的顺序执行。遇到错误，不会再往下执行。
