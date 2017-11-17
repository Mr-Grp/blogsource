---
title: node-模块化 & npm
date: 2017-10-31 20:24:12
tags: [javascript,前端,模块化，node]
categories: node
---

## 1. 模块化

### 1.1 分类
1.系统模块
[中文文档](http://nodejs.cn/api/)
例如：
assert 断言
crypto 加密
net 网络操作
os 操作系统信息
path 处理文件路径
stream 流操作
Timer 定时器
zlib  压缩

在加载的过程中，原生的核心模块的优先级是是最高的

2.自定义模块
用路径加载

3.包管理器npm
可以通过名字引入，不用写路径

### 1.2 require
require(src) 
引入模块
引入当前目录下自己模块要加 './'
先从系统模块找，再从node_modules找，支持上层的node_modules，就近原则

标识符中可以不包含扩展名
Node会按照`.js、.node、.json`的次序补足扩展名，依次尝试	

.node 后缀为node的文件是c/c++写的一些扩展模块
.json文件最终Node.js也是通过fs读文件的形式读取出来的，然后通过JSON.parse()转换成一个对象，最好写后缀，提升速度

Node.js会通过同步阻塞的方式看这个路径是否存在，依次尝试，直到找到为止，如果找不到，报错


### 1.3 module.exports
exports
输出对象

module.exports  
可以直接赋值输出


### 1.4 缓存
common.js规范：加载后，再次加载时，去缓存中去取module.exports

内部机制：
```
				 require   
				    ↓
			是否在文件模块缓存中 ------
				  否↓               ↓
		 -------是否是原生模块       ↓
		 ↓		    ↓               ↓
		 是         否              ↓
		 ↓		    ↓               ↓
	是否在原生    查找文件模块        ↓
----模块缓存中       ↓               是
↓       否↓      根据扩展名载入       ↓
↓	加载原生模块    文件模块          ↓
↓		↓           ↓               ↓
↓	缓存原生模块  缓存文件模块        ↓
↓		↓           ↓               ↓
是      ↓-----------↓               ↓
↓                   ↓               ↓
↓----------------返回exports--------↓
              
```




## 2.包
一种特殊的文件模块，其实就是包
在模块的基础上进一步组织JavaScript代码

### 2.1 包结构

package.json	包描述文件，说明文件
Bin:	存放可执行二进制文件的目录
Lib:	存放JavaScript代码的目录
Doc:	存放文档的目录
Test:	存放单元测试用例的代码
index.js	入口文件

### 2.2 package.json 说明文件

name： 包的名称（最好和文件夹名字一致）
description： 包的简介
version： 包的版本号
keywords： 关键词数组，用于在npm中分类搜索
author:	包的作者
main: 配置包的入口，默认是模块根目录下的index.js
dependencies: 包的依赖项，npm会通过该属性自动加载依赖包
scripts: 指定了运行脚本命令的npmm命令行缩写，例如start

创建指令：
npm init
可以使用 fast-init 保存常用

npm install可以自动下载依赖包，产生node_module目录

生产环境
在当前目录npm i -S jquery，会把依赖加入dependencies并下载，

开发环境
在当前目录npm i -D jquery，会把依赖加入devDependencies并下载


### 2.3 npm
npm 这种东西的最终的目的就是：让你的开发模式工程化，都依靠工具来管理

常用指令：
npm init  【-y】	初始化一个package.json文件
npm install 包名	安装一个包
npm install –save 包名	将安装的包添加到package.json的依赖中（dependencies）
npm install –g 包名	安装一个命令行工具
npm docs 包名	查看包的文档【非常有用】
npm root -g	查看全局包安装路径
npm config set prefix “路径”	修改全局包安装路径
或者修改npmrc文件的prefix，并加入到环境变量 
npm list	查看当前目录下安装的所有包
npm list -g	查看全局包的安装路径下所有的包
npm uninstall 包名	卸载当前目录下某个包
npm uninstall –g 包名	卸载全局安装路径下的某个包
npm update 包名	更新当前目录下某个包
npm update –g 包名	更新某个全局工具包
npm update	更新当前目录下安装的所有包
npm update –g	更新全局所有的工具包


npm install 缩写 npm i
npm install -save 生产环境 npm i -S
npm install -save-dev 开发环境 npm i -D jquery

可以在包后面加 @版本号

### 2.4 nvm npm nrm
nvm node版本的管理工具
npm node的包管理工具
nrm npm的数据源管理工具

### 2.5 上传自己的包
npm login
npm publish
npm unpublish --force
超过24小时不能删除

## 3. 模板工具

fast-init

fi -i 路径@别名
fi -l 查看
fi -u 别名


