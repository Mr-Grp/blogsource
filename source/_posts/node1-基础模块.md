---
title: node-基础模块
date: 2017-10-30 21:36:55
tags: [javascript,前端,模块化，node]
categories: node
---

## 1.http
```
const http=require('http');

var server=http.createServer(function (req, res){
  res.write("abc");
  res.end();
});

server.listen(8080);
```

createServer(回掉函数) 创建服务器
server.listen(8080); 监听端口
res.write(content) 回复内容
res.end() 回复结束
req.url   获取请求地址
`http://127.0.0.1:8080/index.html`的为`/index.html`

chrome 会请求 favicon


## 2.fs
```
const fs=require('fs');

fs.readFile('aaa.txt', function (err, data){
  if(err){
    console.log('读取失败');
  }else{
    console.log(data.toString());
  }
});

fs.writeFile("bbb.txt", "sdafasdwere", function (err){
  console.log(err);
});
```
readFile(文件名, 回调函数(err,data){})   
writeFile(文件名, 内容, 回调函数(err){}) 

例子：
```
const http=require('http');
const fs=require('fs');

var server=http.createServer(function(req,res){
	var file_name='./www'+req.url
	fs.readFile(file_name,function(err,data){
		if(err){
			res.write('404')
		}else {
			res.write(data);
		}
		res.end();
	})
}).listen(8080);
```

## 3.get

### 3.1 远古写法
```
const http=require('http');

http.createServer(function(req,res){
	
	if(req.url.indexOf('?')!= -1){
		var GET={};
		var arr=req.url.split('?');
		var url=arr[0];
		var arr2=arr[1].split('&');

		for(var i=0;i<arr2.length;i++){
			var arr3=arr2[i].split('=');
			GET[arr3[0]]=arr3[1];
		}
		console.log(url,GET);
	}


}).listen(8080);
```
`/form.html { name: '11', ps: 'dasd' }`

### 3.2 使用querystring
```
const http=require('http');
const querystring=require('querystring')

http.createServer(function(req,res){
	
	if(req.url.indexOf('?')!= -1){
		var GET={};
		var arr=req.url.split('?');
		var url=arr[0];
		GET=querystring.parse(arr[1]);
		console.log(url,GET);
	}


}).listen(8080);
```
querystring.parse()，可以把（a=b&b=c...）解析

### 3.3使用 url
```
const http=require('http');
const querystring=require('querystring')
const url=require('url');

http.createServer(function(req,res){
	
	var obj=url.parse(req.url,true);
	console.log(obj.pathname,obj.query);


}).listen(8080);
```
url.parse()会返回一个对象，如果不写true，不会把query解析

```
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=11&ps=dd',
  query: { name: '11', ps: 'dd' },
  pathname: '/form.html',
  path: '/form.html?name=11&ps=dd',
  href: '/form.html?name=11&ps=dd' }
```


## 4. post

post分段发送，所以需要分段接收

两个事件
```
const http=require('http');
const querystring=require('querystring')
const url=require('url');

http.createServer(function(req,res){
	
	var str='';

	req.on('data',function(data){
		str+=data;
	})
	req.on('end',function(){
		console.log(querystring.parse(str));
	})

}).listen(8080);
```
结果：
`name=11&ps=dasd`
data 每次到达的数据
end全部到达


## 5.get/post练习

```
const http=require('http')
const fs=require('fs')
const querystring=require('querystring')
const url=require('url')

var server=http.createServer(function(req,res){

	//GET
	var obj=url.parse(req.url,true)
	var ad=obj.pathname
	const GET=obj.query

	//POST
	var str=''
	req.on('data',function(data){
		str+=data
	})
	req.on('end',function(){
		const POST=querystring.parse(str);
		console.log(ad,GET,POST)
	})

	//文件请求
	fs.readFile('./www'+ad,function(err,data){
		if(err){
			res.write('404');
		} else{
			res.write(data)
		}
		res.end();
	})
	
})

server.listen(8080)
```

## 6. 简易httpserver
登陆注册demo
需要ajax.js，也可以用jquery代替

例子并不好，密码都跑get请求上去了。。。，只是一个简单的demo。

接口：
/user?act=reg&user=name&pass=123
{"ok":false,"msg":"message"}

/user?act=login&user=name&pass=123
{"ok":false,"msg":"message"}

server.js
```
const http=require('http')
const fs=require('fs')
const querystring=require('querystring')
const urlLib=require('url')
var users={}
var server=http.createServer(function(req,res){

	var str=''
	
	req.on('data',function(){
		st+=data
	})

	req.on('end',function(){
		var obj=urlLib.parse(req.url,true)

		const url=obj.pathname
		const GET=obj.query
		const POST=querystring.parse(str)


		if(url=='/user'){
			switch(GET.act){
				case 'reg':
					if(users[GET.user]){
						res.write('{"ok":false,"msg":"该用户已存在"}')
					}else{
						users[GET.user]=GET.pass
						res.write('{"ok":true,"msg":"注册成功"}')
					}
					break;
				case 'login':
					if(users[GET.user]==null){
						res.write('{"ok":false,"msg":"该用户不存在"}')
					}else if(users[GET.user] != GET.pass){
						res.write('{"ok":false,"msg":"用户名或者密码错误"}')
					}else {
						res.write('{"ok":true,"msg":"登陆成功"}')
					}
					break
				default:
					res.write('{"ok":false,"msg":"未知act"}')

			}
		res.end()


		}else{
			var file_name='./www'+url
			fs.readFile(file_name,function(err,data){
				if(err){
					res.write('404')
				}else{
					res.write(data)
				}
				res.end()
			})
		}
	})
})

server.listen(8080)
```



html:
```
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
	<script type="text/javascript" src="ajax.js"></script>
</head>
<body>
	
	
		<input type="text" id='user'>
		<br>
		<input type="password" id='pass'>
		<br>
		<input type="button" id='reg' value="reg">
		<br>
		<input type="button" id='login' value="login">

		<script type="text/javascript">

			var user=document.getElementById('user')
			var pass=document.getElementById('pass')
			var reg=document.getElementById('reg')
			var login=document.getElementById('login')

			reg.onclick=function(){
				ajax({
					url:'/user',
					data: {act:'reg',user:user.value,pass:pass.value},
					type: 'get',
					success: function(str){

						var json=eval("("+str+")");
						
						if(json.ok){
							alert('reg suceess')
						}else{
							alert(json.msg)
						}
					},
					error: function(){
						alert('error')
					}
				})
			}


			login.onclick=function(){
				ajax({
					url:'/user',
					data: {act:'login',user:user.value,pass:pass.value},
					type: 'get',
					success: function(str){

						var json=eval("("+str+")");
						
						if(json.ok){
							alert('login suceess')
						}else{
							alert(json.msg)
						}
					},
					error: function(){
						alert('error')
					}
				})
			}
		</script>
	</form>
</body>
</html>
```


## 6. 断言

用于测试
```
a=6;
console.assert(a==5,'！=5')
```
```

assert.js:81
  throw new assert.AssertionError({
  ^
AssertionError: ！=5
    at Console.assert (console.js:95:23)
    at Object.<anonymous> (C:\Users\G\Desktop\node\console.js:2:9)
    at Module._compile (module.js:570:32)
    at Object.Module._extensions..js (module.js:579:10)
    at Module.load (module.js:487:32)
    at tryModuleLoad (module.js:446:12)
    at Function.Module._load (module.js:438:3)
    at Module.runMain (module.js:604:10)
    at run (bootstrap_node.js:389:7)
    at startup (bootstrap_node.js:149:9)
```


测试效率
```
console.time('t');

for (var index = 0; index < 1000000000; index++) {
    
}

console.timeEnd('t');
```
```
C:\Users\G\Desktop\node>node console.js
t: 836.577ms
```

## 7. process
用来和node程序进行交互的

process 是一个全局可用对象，用来和我们现在启动中的node进行交互的
process.version取版本号
在控制台做标准输出
process.stdout.write(`123123`);  console.log的原型
process.pid：当前进程的进程号。
process.version：Node的版本，比如v0.10.18。
process.platform：当前系统平台，比如Linux。
process.env：指向当前shell的环境变量，比如process.env.HOME。
process.stdout：指向标准输出。
process.stdin：指向标准输入。
process.stderr：指向标准错误。