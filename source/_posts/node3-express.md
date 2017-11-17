---
title: node-express
date: 2017-11-01 21:02:36
tags: [javascript,前端,模块化，node]
categories: node
---

## 1. express

### 1.1 安装
npm i express

demo
```
const express=require('express')

//创建
var server=express()

//处理
server.use('/a.html',function(req,res){
	res.send('abc')
})

//监听
server.listen(8080)
```
req,res 非侵入式，原生的方法还能继续用，又添加了一些方法。
①例如send() 和write()相比，可以支持除了字符串的更多类型。

### 1.2 三种方法

1.	.get()
只接收get请求

2.	.post()
只接收post请求

3.	.user()
get和post都接收

请求只会被上述三个一个接收


express自带基础功能，使用中间件（插件）实现更多功能。

### 1.3 express-static
读取文件
npm i express-static
```
const express=require('express')
const expressStatic=require('express-static')

var server=express()

server.listen(8080)

//指定路径
server.use(expressStatic('./www'))
```
可以获取到www文件夹下的html



### 1.4 demo
②req.query 可以直接获取get数据

```
const express=require('express')
const expressStatic=require('express-static')

var server=express()

var users={
	'G':'123',
	'R':'456',
	'P':'789'
}

server.listen(8080)

server.get('/login',function(req,res){
	var user=req.query['user'];
	var pass=req.query['pass'];

	if(users[user]==null){
		res.send({'ok':false,'msg':'用户不存在'})
	}else if(users[user]!=pass){
		res.send({'ok':false,'msg':'密码错误'})
	}else {
		res.send({'ok':true,'msg':'success'})
	}
})

```

## 2.数据解析

### 2.1 get数据

`req.query`

### 2.2 post数据

安装中间件
npm i -S body-parser

```
server.use(bodyParser.urlencoded({}))

server.use('/',function(req,res){
	console.log(req.body)
})

```
③使用req.body前必须先通过bodyParser处理

bodyParser.urlencoded的参数
```
server.use(bodyParser.urlencoded({
	extended: false,     //扩展模式
	limit: 2*1024          //限制大小,默认100K
}))
```

### 2.3 链式操作

多加一个next参数
next()
```
server.use('/',function(req,res,next){
	console.log('a')
	next()
})
```

### 2.4. 自定义中间件
主要利用next(),将处理后的内容放在req中，传递下去。
简单版 body-parser.urlencoded()
```
const querystring=require('querystring')

module.exports=function(){
			return function(req,res,next){
				var str=''
				req.on('data',function(data){
					str+=data
				})
				req.on('end',function(){
					const POST=querystring.parse(str)
					req.body=POST
					next();
				})
			}
		}
```



## 3. cookie/session

cookie（4K） 客户端，不安全

session    服务端
隐患：session劫持

需要两个中间件
cookie-parser
cookie-session

### 3.1 cookie

npm i cookie-parser -S

demo
```
const express=require('express')
const cookieParser=require('cookie-parser')

var server=express()

server.listen(8080)

server.use(cookieParser('abc'))

server.use('/',function(req,res,next){
	req.secret='abc'
	console.log(req.cookies)
	console.log(req.signedCookies)
	res.cookie('user','G',{path:'/aaa',maxAge:30*24*3600*1000,signed:true})
	res.send('ok')
})
```
#### 3.1.1 cookie设置
`res.cookie('key','value',{path:'/aaa',maxAge:30*24*3600*1000})`

#### 3.1.2 cookie访问
```
const cookieParser=require('cookie-parser')
server.use(cookieParser())
```
使用`req.cookies`访问

#### 3.1.3 cookie 签名（防止篡改）
设置密钥
`req.secret='abc'`

设置允许签名
`res.cookie('key','value',{signed:true})`

设置解析密钥
`server.use(cookieParser('abc'))`
可以不设置`req.secret`

读取
`req.signedCookies`

加密（了解） 中间件 cookie-encrypter

#### 3.1.4 删除
res.clearCookie(name)
如果删不掉
`res.clearCookie('user',{path:'/aaa',maxAge:-1})`



### 3.2 session

npm i cookie-session -S

demo
```
const express=require('express')
const cookieParser=require('cookie-parser')
const cookieSession=require('cookie-session')

var server=express()

server.listen(8080)


server.use(cookieParser())
server.use(cookieSession({
	name:'G',                  //session name
	keys: ['aaa','bbb','ccc'], //keys,越多/长越安全
	maxAge:                    //有效期
}))

var count=0
server.use('/',function(req,res,next){
	req.session['name']=count++
	console.log(req.session)
	res.send('ok')
	
})
```

#### 3.2.1 设置
1.引入
`const cookieSession=require('cookie-session')`

2.配置
```
server.use(cookieSession({
	name:'G',                  //session name
	keys: ['aaa','bbb','ccc'], //keys,越多/长越安全
	maxAge:                    //有效期
}))
```
3.设置
`req.session['name']=value`

#### 3.2.2 读取

`req.session['name']`

每次设置session的时候
session id不会改变
session.sig  签名会变

#### 3.2.3 删除
delete req.session