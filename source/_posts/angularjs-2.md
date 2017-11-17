---
title: angularjs(1)
date: 2017-10-10 14:33:50
tags: [angular,javascript,前端]
categories: angularjs
---
## 1.介绍 ##
AngularJS是一款由Google公司开发维护的前端MVC框架，其克服了HTML在构建应用上的诸多不足，从而降低了开发成本提升了开发效率。

### 1.1特点 ###
AngularJS与我们之前学习的jQuery是有一定的区别的，jQuery更准确来说只一个类库（类库指的是一系列函数的集合）以DOM做为驱动（核心），而AngularJS则一个框架（诸多类库的集合）以数据和逻辑做为驱动（核心）。
框架对开发的流程和模式做了约束，开发者遵照约束进行开发，更注重的实际的业务逻辑。
AngularJS有着诸多特性，最为核心的是：模块化、双向数据绑定、语义化标签、依赖注入等。

### 1.2 MVC ###
Model View Controller
MVC更多应用在后端开发程序里，后被引入到前端开发中，由于受到前端技术的限制便有了一些细节的调整，进而出现了很多MVC的衍生版（子集）如MVVM、MVW、MVP、MV*等。

## 2.模块化 ##
使用AngularJS构建应用（App）时是以模块化（Module）的方式组织的，即将整个应用划分成若干模块，每个模块都有各自的职责，最终组合成一个整体。
采用模块化的组织方式，可以最大程度的实现代码的复用，可以像搭积木一样进行开发。

### 2.1 定义应用 
通过为任一HTML标签添加ng-app属性，可以指定一个应用，表示此标签所包裹的内容都属于应用（App）的一部分。
`<body ng-app>`
一般定义在html标签或者body标签
可以不赋值，但关联相应的模块时需要赋值。

### 2.2 定义模块 
AngularJS提供了一个全局对象angular，在此全局对象下存在若干的方法，其中angular.module()方法用来定义一个模块。
`var app=angular.module('App',[]);`

### 2.3 定义控制器
控制器（Controller）作为连接模型（Model）和视图（View）的桥梁存在，所以当我们定义好了控制器以后也就定义好了模型和视图。，

模型（Model）数据是要展示到视图（View）上的，所以需要将控制器（Controller）关联到视图（View）上，通过为HTML标签添加ng-controller属性并赋值相应的控制器（Controller）的名称，就确立了关联关系。
```
<body ng-app='App'>
<div ng-controller='DemoContoller'>
	{{name}}
</div>

<script type="text/javascript">
	var app=angular.module('App',[]);
	app.controller('DemoContoller',['$scope',function($scope){
		//模型
		$scope.name='hello world';
	}]);
</script>
	
</body>
```
一般一个页面只有一个module，不要嵌套。

### 2.4 结构 ###
![](/images/angular/angularjs.png)

## 3.指令 ##
HTML在构建应用（App）时存在诸多不足之处，AngularJS通过扩展一系列的HTML属性或标签来弥补这些缺陷，所谓指令就是AngularJS自定义的HTML属性或标签，这些指令都是以ng-做为前缀的，例如ng-app、ng-controller、ng-repeat等。

### 3.1 内置指令 ###
常用：
```
ng-app 指定应用根元素，至少有一个元素指定了此属性。
ng-controller 指定控制器
ng-show 控制元素是否显示，true显示、false不显示
ng-hide 控制元素是否隐藏，true隐藏、false不隐藏
ng-if控制元素是否“存在”，true存在、false不存在（元素会消失，查看表单元素看不到）
ng-src增强图片路径 {{}}
ng-href增强地址 {{}}
ng-class控制类名{类名：1/0，类名：1/0}
ng-include引入模板 {{}}
ng-disabled表单禁用 true/false
ng-readonly表单只读 true/false
ng-checked单/复选框表单选中 true/false
ng-selected下拉框表单选中 true/false
ng-repeat 遍历数组"name in names"
$index 可以获取到数组的索引
ng-bind='变量名' 标签内容为变量值
```

### 3.2 自定义指令 ###
AngularJS允许根据实际业务需要自定义指令，通过angular全局对象下的directive方法实现。

```
App.directive('tag', function () {
			// 返回一个对象，这个对象就是自定义指令相关的内容
			return {
				// E element
				// A attribute
				// C class
				// M mark replace 必须为true
				restrict: 'ECMA',
				template: '<ul><li>首页</li><li>列表</li></ul>',
				//templateUrl: './list.html',
				replace: true
			}
```

```
	<!-- 属性 -->
	<div tag></div>
	<!-- 元素 -->
	<tag></tag>
	<!-- 类 -->
	<div class="tag"></div>
	<!-- mrak -->
	<!-- directive:tag -->
```
replace必须为true，内容会代替标签盒子，mark必须使用

## 4.数据绑定 ##
AngularJS是以数据做为驱动的MVC框架，所有模型（Model）里的数据经由控制器（Controller）展示到视图（View）中。
所谓数据绑定指的就是将模型（Model）中的数据与相应的视图（View）进行关联，分为单向绑定和双向绑定两种方式。

### 4.1 单向绑定 ###
单向数据绑定是指将模型（Model）数据，按着写好的视图（View）模板生成HTML标签，然后追加到DOM中显示。

### 4.2双向绑定  ###
双向绑定则可以实现模型（Model）数据和视图（View）模板的双向传递。

### 4.3相关指令 ###
1.在AngularJS中通过双花括号和ng-bind指令来实现模型（Model）数据向视图模板（View）的绑定，模型数据通过一个内置服务$scope来提供，这个$scope是一个空对象，通过为这个对象添加属性或者方法便可以在相应的视图（View）模板里被访问。

2.双花括号绑定数据时会有“闪烁”现象，添加ng-cloak也可以解决“闪烁”现象，通过css，在加载时display none，加载完成后清除属性。

3.通过ng-bind-template可以绑定多个数据。
`ng-bind-template="{{name}}{{age}}"`要加双花括号

4.通过ng-init可以初始化模型（Model）也就是$scope。
`ng-init="name='itcast';age=10"`

5.AngularJS对事件也进行了扩展，无需显式的获取DOM元素便可以添加事件，易用性变的更强。通过在原有事件名称基础上添加ng-做为前缀，然后以属性的形式添加到相应的HTML标签上即可。如ng-click、ng-dblclick、ng-blur等。
`ng-click="fn()"`
```
$scope.fn = function () {
				alert('hello world');
			}
```
参数：
$event可以获取事件
$index可以获取数组索引值

6.通过ng-repeat可以将数组或对象数据迭代到视图模板中，ng-switch、on、ng-switch-when可以对数据进行筛选。
```
<li ng-repeat="item in items" ng-switch on="item">
	<span ng-switch-when="css">{{item}}</span>
</li>
```
只会显示数组里的css，也可以ng-switch="item"

