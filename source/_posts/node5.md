---
title: node-文件上传
date: 2017-11-03 20:15:02
tags: [javascript,前端,模块化，node]
categories: node
---

## 1.文件上传

multer

npm i -S multer

```
//引入
const multer=require('multer')

//初始化，设置上传路径
var objMulter=multer({dest:'www/upload/'})

//处理
server.use(objMulter.any())

//查看信息
server.use('/',function(req,res,next){
	console.log(req.files)
})
```



req.files内容
```
[ { fieldname: 'fs',
    originalname: '1.mp3',
    encoding: '7bit',
    mimetype: 'audio/mp3',
    destination: 'www/upload/',
    filename: '2b9d6ce44c1270432bdb997fb4519f15',
    path: 'www\\upload\\2b9d6ce44c1270432bdb997fb4519f15',
    size: 7573224 } ]

```
上传后的文件名为2b9d6ce44c1270432bdb997fb4519f15

需要重命名


### 1.1 重命名
将a.txt改为b.txt
```
fs.rename('a.txt','b.txt',function(err){
	console.log(err)
})
```

### 1.2 path模块

引入
`const path=require('path')`

`console.log(path.parse('c://wamp/root/a.html'))`

basename：文件名
```
{ root: 'c:/',
  dir: 'c://wamp/root',
  base: 'a.html',
  ext: '.html',
  name: 'a' }

```

### 1.3 上传文件重命名

```
var newName=req.files[0].path+path.parse(req.files[0].originalname).ext

	fs.rename(req.files[0].path,newName,function(err){
		if(err){
			res.send('fail')
		}else {
			res.send('success')
		}
	})
```