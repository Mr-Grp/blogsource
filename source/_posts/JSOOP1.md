---
title: js面向对象
date: 2017-10-24 23:49:58
tags: [javascript,前端]
categories: javascript
---
## 1.Object类 ##
Object提供了很多静态方法（用来操作的方法）辅助我们进行功能开发，除此以外它的原型对象中也有一些方法。

### 1.1 create创建对象 ###

1.创建一个对象

```
var o=Object.create(Object.prototype,{
  		//普通数据
  		w:{
  			value:20,
  			writable: true,
  			configurable: true,
  			enumerable: true,
  		},
  		//访问其数据
  		h:{
  			get:function(){
  				return s;
  			},
  			set:function(a){
  				s=a+1;
  			}
  		}
  	})

  	o.h=5;
  	console.log(o.h)  //6
```

2.创建特有的实例对象

```
 	function foo(w,h){
  		this.w=w;
  		this.h=h;
  	}
  	foo.prototype.area=function(){
  		return this.w*this.h
  	}

  	var o=Object.create(foo.prototype,{
  		w:{
  			value:20,
  		}
  	})
```
3.使用create实现父类方法的继承
```
  	function foo(w,h){
  		this.w=w;
  		this.h=h;
  	}
  	foo.prototype.area=function(){
  		return this.w*this.h
  	}

  	function son(w ,h){
  		foo.call(this,w,h)
  	}
  	son.prototype=Object.create(foo.prototype);
	var s=new son(10,10)
```
### 1.2 属性描述符 ###

```
  	var o={};
  	Object.defineProperty(o,"foo",{
  		value:'hello world',
  		writable: true,
  		configurable: true,
  		enumerable: true,
  	})

  	console.log(Object.getOwnPropertyDescriptor(o,'foo'))
```

1.writable: true/false

属性是否可写，即是否可以被修改，如果为false，修改无效，严格模式会报错。

2.configurable: true/false

属性是否可配置，不可配置的属性不能重写为可配置属性。
不可配置属性不能delete

3.enumerable: true/fasle

是否可枚举，弱国为false，不能使用for in遍历

### 1.3 对象不变性 ###

1.创建对象常量属性

configurable：false
writable：false

这样无法被修改。

2.禁止扩展

Object.preventExtensions(o)

无法给对象o动态添加属性。

3.对象密封

密封就是让阻止对象扩展（preventExtensions），且不可配置（configurable），使用Object.isSealed(o)检测对象是否被密封。
使用Object.seal(o) 可以直接密封。

4.对象冻结
就是将对象密封（seal） 且值不可修改（writeable）, Object.isFrozen(o)还可以检测一个对象是否被冻结。
Object.freeze(o)可直接冻结对象。

### 1.4 其他静态方法 ###

1.assign

var m=Object.assgin({},o)

把o克隆给m

2.keys和values

Object.keys(o)
Object.values(o)

返回的是数组格式。

### 1.5 原型对象方法 ###
原型对象的属性方法 要使用对象来访问，而静态的属性和方法 使用类名.
constructor属性		查看实例对象所属的类
hasOwnProperty方法  检测对象是否有非继承的属性
toString()和valueOf()方法