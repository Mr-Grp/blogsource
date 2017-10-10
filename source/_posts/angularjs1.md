---
title: angularjs(2)
date: 2017-10-10 17:11:22
tags: [angular,javascript,前端]
categories: angularjs
---
## 1.作用域 ##
通常AngularJS中应用（App）是由若干个视图（View）组合成而成的，而视图（View）又都是HTML元素，并且HTML元素是可以互相嵌套的，另一方面视图都隶属于某个控制器（Controller），进而控制器之间也必然会产生嵌套关系。
每个控制器（Controller）又都对应一个模型（Model）也就是$scope对象，不同层级控制器（Controller）下的$scope便产生了作用域。

### 1.1 根作用域 ###
一个AngularJS的应用（App）在启动时会自动创建一个根作用域$rootScope，这个根作用域在整个应用范围（ng-app所在标签以内）都是可以被访问到的。

### 1.2 子作用域 ###
通过ng-controller指令可以创建一个子作用域，新建的作用域可以访问其父作用域的数据。

自己有就访问自己的，没有往父级找。

## 2.过滤器 ##
在AngularJS中使用过滤器格式化展示数据，在 双花括号 中使用“|”来调用过滤器，使用“:”传递参数。

### 2.1 内置过滤器 ###
1.currency将数值格式化为货币格式
```
{{price|currency:'￥'}}
```
2.date日期格式化，年（y）、月（M）、日（d）、星期（EEEE/EEE）、时（H/h）、分（m）、秒（s）、毫秒（.sss），也可以组合到一起使用。
```
{{now|date:'yyyy/MM/dd hh:mm:ss EEEE' }}

```
3.filter在给定数组中选择满足条件的一个子集，并返回一个新数组，其条件可以是一个字符串、对象、函数
```
{{items|filter:'s'}}</li>
{{students|filter:{age: 16} }}
```
可以是对象，但要有空格

4.json将Javascrip对象转成JSON字符串。

5.limitTo取出字符串或数组的前（正数）几位或后（负数）几位

6.lowercase将文本转换成小写格式

7.uppercase将文本转换成大写格式

8.number：保留小数数字格式化，可控制小位位数

9.orderBy：”string(可以是对象里的)” ：true（倒序，默认fasle）对数组进行排序，第2个参数可控制方向
```
{{items|orderBy: '':true}}
```

### 2.2 自定义过滤器 ###
除了使用AngularJS内建过滤器外，还可以根业务需要自定义过滤器，通过模块对象实例提供的filter方法自定义过滤器。
首字母大写：
```
App.filter('capitalize', function () {
	return function (input) {
		return input[0].toUpperCase() + input.slice(1);
	}

});
```

## 3.依赖注入 ##
AngularJS采用模块化的方式组织代码，将一些通用逻辑封装成一个对象或函数，实现最大程度的复用，这导致了使用者和被使用者之间存在依赖关系。 
所谓依赖注入是指在运行时自动查找依赖关系，然后将查找到依赖传递给使用者的一种机制。
常见的AngularJS内置服务有$http、$location、$timeout、$rootScope等

### 3.1 推断式注入 ###
没有明确声明依赖，AngularJS会将函数参数名称当成是依赖的名称。
这种方式会带来一个问题，当代码经过压缩后函数的参数被压缩，这样便会造成依赖无法找到。不用这个。
```
App.controller('DemoController', function ($scope, $http) {
});
```

### 3.2 行内注入 ###
以数组形式明确声明依赖，数组元素都是包含依赖名称的字符串，数组最后一个元素是依赖注入的目标函数
```
App.controller('DemoController', ['$scope', '$http', function (abc, bcd) {

			abc.name = '依赖注入';

		}]);
```
建议最好形参名字和服务一样。
## 4.服务 ##
服务是一个对象或函数，对外提供特定的功能。

### 4.1 内建服务 ###
1、$location是对原生Javascript中location对象属性和方法的封装。
`http://www.php7.com/8-01.html#/aa?name=1#hh`
+	$location.absUrl(); 完整地址
+	$location.url();   #以后
+	$location.host();   域名
+	$location.search(); 参数
+	$location.hash(); hh
+	$location.protocol(); 协议
+	$location.port(); 端口
+	$location.path(); /aa


2.$timeout/$interval
```
$timeout(function () {
	//content
}, 3000);

var timer = $interval(function () {
//content
}, 1000);

$scope.stop = function () {
	$interval.cancel(timer);
}
```

3.$filter
```
currency = $filter('currency');

$scope.price = currency($scope.price);

```
其他类似

4.$log打印调试信息
```
$log.info('普通信息');

$log.warn('警告信息');

$log.error('错误信息');

$log.log('打印信息');

$log.debug('调试信息');
```

5.$http用于向服务端发起异步请求。
get:
```
$http({
	url: './stars.php',
	method: 'get'
}).success(function (info) {
	$log.info(info);

	$scope.stars = info;
});
```
post:
```
$http({
	url: 'example.php',
	method: 'post',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	params: { // get 参数
		name: 'itcast',
		sex: '男'
	},
	// data: 'age=10'
	data: { // post 传参
		age: 10
	}
}).success(function (info) {
	// info 就是返回的数据
	$log.info(info);
});
```
这样data不会自动转换，应该写成"age=10&......"
jsonp:
和ajax没啥关系，利用的是script标签可以跨域的特性。
```
$http({
	url: 'example.php?callback=JSON_CALLBACK',
	method: 'jsonp' // 采用JSONP方式
}).success(function (info) {
	console.log(info);
});
```
JSON_CALLBACK不能改

###  4.2 自定义服务	###

1、factory方法
```
App.factory('showTime', ['$filter', function ($filter) {

		var now = new Date();

		var date = $filter('date');
		var i=function(){
			alert(1)
		}
		return {
			now: date(now, 'y-M-d H:m:s'),
			i:i
		}

	}]);
```
```
showTime.now;
showTime.i();
```

2、service方法
```
App.service('showTime', ['$filter', function($filter) {

			var now = new Date();

			var date = $filter('date');
			
			this.now = date(now, 'y-M-d H:mm:ss');
			this.i=function(){
				alert(1)
			}
		}]);
```
```
showTime.now;
showTime.i();
```

3、value方法定义常量
```
App.value('name', 'a');
App.value('age', '14');
```

依赖注入要加入新增的这些服务。