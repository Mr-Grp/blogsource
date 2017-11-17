---
title: webpack
date: 2017-10-28 17:29:36
tags: [webpack,前端,工具]
categories: webpack
---
看起来可能会有些混乱，观看慕课的视频的笔记，官方文档也有详细教程（有中文文档）。

## 1.基本介绍

### 1.1 介绍
webpack 是一个现代 JavaScript 应用程序的模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成少量的 bundle - 通常只有一个，由浏览器加载。

common amd es6 规范

### 1.2 安装和cli

#### 1.2.1 安装
1.全局安装：npm install -g webpack

2.局部安装：
先创建package.json 
npm init -y
添加依赖包
npm install webpack --save-dev
（为了引入方便）

#### 1.2.1 打包

命令行中：
```
webpack hello.js a.js
```
```
Version: webpack 3.8.1 
Time: 99ms 
Asset     Size  Chunks             Chunk Names
 a.js  2.54 kB       0  [emitted]  main
打包成的文件   大小   分块         块名称
   [0] ./hello.js 64 bytes {0} [built]
```

1.处理css文件需要加入以下包
npm install css-loader style-loader --save-dev

css-loader:使webpack可以处理css文件

style-loader:处理完的文件新建一个sytle标签插入到html

```
require('./world.js');
require('style-loader!css-loader!./style.css');
console.log('aaa');
function hello(str){
	alert(str)
}
hello('111');
```

也可以在命令行中加入如下命令代替require写法 
--module-bind'css=style-loader！css-loader!'

2.webpack一些其他指令

--watch 时时更新
--progress 进度条
--display-module 列出模块
--display-reason 引入模块的原因


## 2. webpack基本配置

可以使用默认的，也可以自己配置。
webpack 会默认使用当前目录下webpack.config.js
```
module.exports= {
	entry: './src/script/main.js',
	output: {
		path: __dirname + '/dist/js',
		filename: 'bundle.js'
	}
}
```

命令行中也可以指定配置文件
webpack --config 配置文件名  

### 2.1 webpack命令添加参数
如果想要添加参数，还可以在package.json中：
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack" : "webpack --config webpack.config.js --progress --display-modules --colors --display-reasons"
  },
```
命令行中
`npm run webpack`运行脚本

### 2.2 entry入口
三种方式
字符串：`entry: './src/script/main.js',`
数组形式：`entry: ['./src/script/main.js','./src/script/a.js'],`
对象形式
```
entry: {
		main: './src/script/main.js',
		a: './src/script/a.js'
	},
```

### 2.3 ouput出口

1.file-name中的占位符

[name] 序号
[hash] 本次打包的哈希
[chunkhash]  文件的哈希

filename: '[name]-[hash].js'
这样每次打包会生成不同的文件，不会覆盖。

2.context：默认为运行脚本的目录

3.publicPath: '上线地址'，html模板中引入这个地址作为绝对地址的头。


## 3.html-webpack-plugin
用于自动生成html

### 3.1 安装
npm i html-webpack-plugin
一些使用在npm上有具体文档。
[文档](https://www.npmjs.com/package/html-webpack-plugin)
### 3.2 引入

在配置文件中
```
var htmlWebpackPlugin = require('html-webpack-plugin');


module.exports= {
	entry: {
		main: './src/script/main.js',
		a: './src/script/a.js'，
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name]-[hash].js',
		publicPath: 'http://grpblog.com/' //公共地址（头）
	},
	plugins: [
		new htmlWebpackPlugin({
			template: 'index.html'
		})
	]
}
```

会默认在js目录中生成index.html，并且关联目录根目录的index.html
修改path和filename，将js放在js文件夹中，index.html放到dist中


### 3.3 配置模板的属性

plugins配置文件中属性
```
plugins: [
		new htmlWebpackPlugin({
			template: 'index.html', //模板名
			filename: 'index-[hash].html', //文件名，可以使用前面的占位符。
			inject: 'head', //js插入位置，可以为false，不插入
			title: 'hello',
			date: new Date(),
			//压缩
			minify: {
				removeComments: true,  //注释
				collapseWhitespace: true   //空格
			},
			chunks: ['',''], //只引入特定的chunk
			excludeChunks: ['b']
		})
	]
```
1.	template: 'index.html', //模板名
2.	filename: 'index-[hash].html', //文件名，可以使用前面的占位符。
3.	inject: 'head', //js插入位置，可以为false，不插入
4.	title: 'hello',
5.	date: new Date(),
6.	//压缩
minify: {
	removeComments: true,  //注释
	collapseWhitespace: true   //空格
},
[压缩属性](https://github.com/kangax/html-minifier#options-quick-reference)

7.	chunks: ['',''] //只引入特定的chunk
8.  excludeChunks: ['b'] //除去b块



### 3.4 html模板
在inex.html中,支持使用模板
`<% js >`
`<%=htmlWebpackPlugin.options.name >`


#### 3.4.1 htmlWebpackPlugin
遍历`htmlWebpackPlugin`得到options和files属性
```
	<% for (var key in htmlWebpackPlugin) { %>
		<%= key %>:<%= JSON.stringify(htmlWebpackPlugin[key]) %>
	<% } %>
```
继续遍历files

```
		publicPath:""
		chunks:{"main":{"size":0,"entry":"js/367ad61fbcdd683388c1.js","hash":"367ad61fbcdd683388c1","css":[]},"a":{"size":19,"entry":"js/87d6afdc9f44ca62c659.js","hash":"87d6afdc9f44ca62c659","css":[]}}
	
		js:["js/367ad61fbcdd683388c1.js","js/87d6afdc9f44ca62c659.js"]
	
		css:[]
	
		manifest:
```
继续遍历options

```
		template:"C:\\Users\\G\\Desktop\\前端项目\\webpack-demo\\node_modules\\html-webpack-plugin\\lib\\loader.js!C:\\Users\\G\\Desktop\\前端项目\\webpack-demo\\index.html"
	
		filename:"index-[name].html"
	
		hash:false
	
		inject:"head"
	
		compile:true
	
		favicon:false
	
		minify:false
	
		cache:true
	
		showErrors:true
	
		chunks:"all"
	
		excludeChunks:[]
	
		title:"hello"
	
		xhtml:false
	
		date:"2017-11-12T09:29:31.443Z"
```

通过这种方式，可以手动配置html模板中的内容，例如script的引入，可以使用`files.chunks.main.entry`,同时将inject设置为false。

### 3.5 多页面
写多个plugins即可
```
plugins: [
		new htmlWebpackPlugin({
			template: 'index.html',
			filename: 'a.html',
			inject: 'head',
			title: 'a',
			date: new Date(),
			excludeChunks: ['b']
		}),
		new htmlWebpackPlugin({
			template: 'index.html',
			filename: 'b.html',
			inject: 'head',
			title: 'b',
			date: new Date(),
			chunks: ['c']
		}),
		new htmlWebpackPlugin({
			template: 'index.html',
			filename: 'c.html',
			inject: 'head',
			title: 'c',
			date: new Date(),
			chunks: ['a','main']
		})
	]
```

### 3.6 行内引入js
为了减少http请求，所以需要引用行内js

inject: false

#### 3.6.1 引入公有的行内处理后的js

```
	<script type="text/javascript">
		<%=
		compilation.assets[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)].source()
		%>
	</script>
```
插件提供了具体的方法
compilation.assets[去掉公共路径的src].source()

截取路径：（从全部路径中公共路径后截取到最后）
[htmlWebpackPlugin.files.chunks.main.entry.substr(htmlWebpackPlugin.files.publicPath.length)

#### 3.6.2 手动引入自己特有的js。
```
	<% for( var k in htmlWebpackPlugin.files.chunks){ %>
		<% if( k !== 'main'){ %>
			<script type="text/javascript" src="<%=htmlWebpackPlugin.files.chunks[k].entry %>"></script>
		<% } %>
	<% } %>
```


## 4.Loader

使用npm安装所需要的loader
npm install --save-dev babel-loader babel-core


### 4.1 引入(以label为例)

+	require中引入
require('style-loader!css-loader!./style.css');
可以`?参数&参数`

+	cli中引入
--module-bind'css=style-loader！css-loader!'
可以`?参数&参数`

+	配置文件中使用
```
module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/, //绝对路径，或者不带引号（正则）
				include: /src/, 
				loader: 'babel-loader',   //3.0一定要写全
				query: {
					presets: ['latest'] //参数
				}
			}
		]
	},
```
除此之外
include：可以指定处理哪些。
loaders： 数组形式。

#### 4.1.1 生成绝对路径的方法
```
var path=require('path');
path.resolve(__dirname,'node_modules'),
```
这里不要使用字符串拼接，会出错。
第二个参数前不要加/

#### 4.1.2 presets
转换为一些版本的es特性，需要指定参数。
参数需要插件
npm install --save-dev babel-preset-latest

latest包括 es5 es6 es7特性,推荐这个

除了在配置文件中其他定义presets的方法

1.	根目录创建如下文件
.babelrc
```
{
	presets: ['lastest'] 
}
```

2. package.json中
```
"bable": {
	"presets": ["lastest"] 
},

```

