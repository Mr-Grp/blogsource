---
title: js面向对象
date: 2017-10-23 18:17:46
tags: [javascript,前端]
categories: javascript
---


## 1.自定义类 ##

使用构造函数定义类

例如
```
	function foo(w,h){
		this.width=w;
		this.height=h;
		this.area=function(){
			return this.width*this.height;
		}
	}
	
	var t=new foo(10,20);
	console.log(t.area())
```

## 2.原型对象 ##

因为每个对象只有属性不一样，而方法都一样，那么考虑将这些方法和 一些不变的内容放入一个单独、公开的对象中存储，然后让其他对象来继承和共享，这个对象就是原型对象，这样就会降低每个对象占用的内存空间。

构造函数或者类的prototype指向该类的原型对象，对象的constructor属性引用它的构造函数。
每个对象中`__proto__`指向类的原型对象。
例如
```
  	function foo(w,h){
  		this.width=w;
  		this.height=h;
  	}

	foo.prototype.area=function(){
  		return this.width*this.height;
  	}

  	var t=new foo(10,20);
  	console.log(t.area())
```

### 2.1 原型继承和原型链 ###

当实例需要某个方法时，它会首先从对象自身开始查找，如果没有则到它的原型对象中查找。

原型对象本身也是一个对象，是Object类的一个对象，Object类也有自己的原型对象，所以每个原型对象本身还会指向Object类的原型对象，就会存在这样一个原型链。

### 2.2 扩展内建对象的方法 ###

有了原型对象 我们就可以给系统类（内建对象）的原型对象添加方法 这样在任何地方使用系统类的时候 都有一套自己的方法 方便我们快速实现功能定制。

例如：

```
//给String类的原型对象中添加一个count方法 计算一个字符串中某字符的个数
 	String.prototype.count=function(t){

      var c=0;
      for(var i=0;i<this.length;i++){
      	if(this[i]==t){
      		c++
      	}
      }
      return c;
  	}

  	var s=new String('hello world');
  	console.log(s.count('o'))
```

## 3.静态成员 ##
不随对象的改变而改变，属于类自身存放在类中，使用类名来访问。
在面向对象的其他语言中，静态成员一般使用static声明。在JS中，函数是对象，有属性和方法，作为构造函数或者类的函数，它的属性就称为静态的属性。

例如：
```
  	function foo(s){
  		this.s=s;
  	}
  	foo.width=10;
  	foo.S=function(m){
  		return m.s;
  	}
  	var t=new foo(10);
  	console.log(foo.S(t))
```
简单来说就是直接给类属性赋值就是静态属性，类定义的方法就是静态方法，可以直接由类调用。（区别this，构造函数中this的方法是属于对象的）

对象的constructor是查找它所属的类（构造函数），在方法体内通常使用this.constructor来替代当前类名，可以使用这样的方式调用静态属性。

静态方法体内的this 指代的是当前的类，也就是构造函数，但通常不会在静态方法中使用this.

静态使用例子
```
function foo(s){
  		console.log(++this.constructor.count)
  	}
  	foo.count=0;
  	var t=new foo(10);
  	var t=new foo(10);
  	var t=new foo(10);
```
结果为1，2，3

## 4.封装 ##
面向对象中的封装是隐藏对象的内部细节以及对内部成员的访问控制，这样做的目的是为了维护数据的完成性以及对内部成员的保护。在面向对象语法中 通常使用访问修饰符 public、protected以及private实现的封装。在JS中 没有相应的语法支持 只能通过模拟去实现部分封装的效果。

### 4.1 对象属性 ###
作为对象属性的数据值 是公有的封装，它在本类（构造函数、类中的原型对象的方法）中可以使用 通过this来访问。同时在外部可以使用对象来访问 所以是公有的。

### 4.2 私有封装的实现 ###

1.在构造函数和方法中 使用var声明为局部变量
是一个私有的数据，它只能在本方法中，不能在本类中其他方法或者类的外部使用，是一种极端条件的封装。

2.可以将属性封装到一个方法中 然后使用方法来访问这个属性，在方法体内进行访问控制
```
  	function foo(s){
  		this.getS=function(){
			if(this.constructor!=foo){  //只有本类可以访问该方法。
				throw new Error('error');
			}
			else{
				return s;
			}		
  		}
  	}
  	var t=new foo(10);
  	var str=new String();
  	try{
  		console.log(t.getS.call(str))
  	}catch(e){
  		console.log(e.message)
  	}
```

## 5.继承 ##

继承是面向对象的重要特性，它是指一个类（子类）通过继承拥有另一个类（父类）中所有的内容（包括属性和方法）。JS中没有extends的语法 也是要通过模拟来实现继承，那就要能够实现 
+	子类拥有父类的属性。
+	子类拥有父类的方法。

### 5.1 简单继承 ###
使用for/in来遍历一个对象A，然后将属性赋值给另一个对象B 从而使B对象也有了A中的所有的内容，这个一般称为“借用”，就是B借用A中的属性和方法。

### 5.2 子类拥有父类的属性 ###

在子类中使用 foo.call(this,argv1,...)的方式。

### 5.2 子类拥有父类的方法 ###
父类的一个实例对象 拥有父类中所有的方法（实例对象自己的方法、从父类原型对象中继承的方法），那么如果要继承父类的方法 也就是将子类的原型对象（方法都存于原型中）设为父类的一个实例对象。
```

  function foo(w,h){
  		this.width=w;
  		this.height=h;
  	}

	foo.prototype.area=function(){
  		return this.width*this.height;
  	}
  	function son(w,h){
  		foo.call(this,w,h)   //获取父类的属性
  	}
  	son.prototype=new foo;   //获取父类的原型对象

 	delete son.prototype.width;  //把父类构造函数中的属性清空
  	delete son.prototype.height;

  	son.prototype.constructor=son;  //将源原型对象的constructor设置为自己
  	var t=new son(10,20);
  	console.log(t.area())
  	console.log(t.width)
    console.log(t.height) 
```