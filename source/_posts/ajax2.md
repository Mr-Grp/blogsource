---
title: ajax2
date: 2017-10-01 20:30:24
tags: [blog,ajax,javascript,前端,php,后端,JSON]
categories: ajax
---

##	**1.JSON格式**

客户端需要和服务端进行数据交换，可以做数据交换的格式有数字，字符串，XML格式，JSON。
JSON(javascript object notation)，是一个轻量级的数据交换格式，比XML生成和处理更加方便，JSON有取代XML的趋势。
###	**1.1语法**
语法：{键：值，键：值}
JSON格式数据格式，同时也是字面量对象，一些使用如下：
```
var obj={
	'name':'lili',
	'age':17,
	'array':[10,20,30],
	'o':{'a':'1','b':'2'},
	'fun':function(){alert(1)}
}
// 属性的调用
console.log(obj.name)
console.log(obj['name'])
//方法的调用
obj.fun()
obj['fun']()
//数组，json
console.log(obj.o)
console.log(obj['o'])
console.log(obj.array)
console.log(obj['array'])
//可遍历
for(s in obj){
	console.log(obj[s])
}
```
调用可通过.或[]

结果：
```
lili
lili
Object
Object
Array(3)
Array(3)
lili
17
Array(3)
Object
ƒ (){alert(1)}
```

###	**1.2.PHP生成JSON**
Json_encode();   PHP->JSON
Json_decode();   JSON->PHP

###	**1.3.PHP与JSON转换规律**
一维数组
只要有一个元素是关联形式，转成json就转换成键值对(字面量格式),逆转换变成object

![](/images/json/3.png)

二维数组

![](/images/json/2.png)

对象

![](/images/json/1.png)

True表示反编译成数组，默认反编译成对象

###	**1.4Js访问PHP的JSON数据接口**
`eval('var info=string')`将字符串转换成对象

##	**2.FormData对象**
PHP配置文件中，需要进行设置
```
post_max_size
upload_max_filesize
```

使用FormData不需要 enctype 属性，可以发送文件信息。
使用formDta对象，post传递不需要设置头。
```
<div id='d'></div>

<form action="" method="post" id='frm'>
	<input type="file" name="a" id="file">
	<a href="javascript:void(0)" onclick="fn()" >submit</a>
</form>

<script type="text/javascript">
	function fn(){
		var req=new XMLHttpRequest();
		var frm=document.getElementById('frm')
		var fd=new FormData(frm);
		req.open('post', 'ajax.php');
		req.onreadystatechange=function(){
			if(req.readyState==4 && req.status==200){
				console.log(req.responseText);
			}
		}	
		req.upload.onprogress=function(e){
			document.getElementById('d').innerHTML=Math.ceil((e.loaded/e.total)*100);	
		}
		req.send(fd);
	}

```
```
<?php 
move_uploaded_file($_FILES['a']['tmp_name'],"./{$_FILES['a']['name']}");
var_dump($_FILES['a'])
?>
```
如果控制台结果中有pre，在php配置文件中关闭xdebug即可。

##	**3.跨域请求**
浏览器不允许AJAX跨域请求
解决方案：
1.可以用PHP做代理
2.可以使用jsonp
返回一个"函数名(内容)"，即把内容作为参数返回
定义一个这样的函数
例如：
```
<script type="text/javascript">
	function a(result){
		alert(result)
	}
</script>
<script src="ajax.php?callback=a"></script>
```
```
<?php 
$name='hahahaha';
$content=json_encode($name);
echo $_GET['callback'].'('.$content.')';
?>
```


