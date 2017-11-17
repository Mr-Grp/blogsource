---
title: XML
date: 2017-09-30 21:25:22
tags: [XML,javascript,php]
categories: XML
---
##	**1.简介**
XML全称 extensible Markup Language（可扩展标记语言）  

+	可扩展是指XML支持用户自定义标签来描述自身携带的信息，一般也叫做“自我描述性”。  
+	XML的设计是用来存储数据 它没有显示效果。
+	XML和HTML对比（差异）  
	1.HTML中只能使用预定义的标签 自定义标签没有显示效果 而XML支持且必须是用户自定义标签。  
	2.HTML标签除了存储内容外 还有显示样式 标签的使用取决于要显示的样式（区分样式）。  而XML标签没有显示样式 使用不同的标签是为了区分不同类型的数据（区分数据）
	3.HTML标签语法松散，例如 标签可以不关闭 属性可以不加单双引号。而XML语法严谨 必须严格遵循W3C的标准 否则报错。	  

##	**2.XML的使用**
###		**2.1XML标签的语法组成**
1.文档声明	
2.元素（标签）	
3.元素属性
4.注释 				<!-- 注释内容 -->
5.特殊字符（< > ‘ “）  	使用字符实体补充< >的字符
6.CDATA区 
7.处理指令
###		**2.2XML的创建及语法**
XML文件以“.xml”作为后缀名，文档需要声明头信息`<?xml version=”1.0” encoding=”utf-8” ?>`
+	XML的标签必须关闭 否则解析时报错
+	XML标签区分大小写，例如title和Title是不一样的标签
+	XML标签只能嵌套不能交叉
+	XML标签可以有属性 但属性必须有值 且用单双引号括起来 否则解析出错。
+	当XML标签中的内容含有特殊字符（<、>、’、”）时 为避免解析时的歧义 需要使用字符实体替代(&lt;$gt;&amp;&copy;)，当内容较多时 可以将它们放入CDATA（character data）段中 表示这是一段字符数据 不要当成标签来解析。`<![CDATA[<<>???///]]>`

##	**3.XML的用途**
XML是用来存储数据的，它有很强的数据存储能力，是介于记事本和数据库之间的存储神器，相比记事本它可以结构化的存储数据 通过标签来检索和提取数据。同时 比数据库使用起来更加简便、灵活 无需安装 不用通过复杂的sql指令来查询数据。
+	用作配置文件：数据库配置、项目配置、应用程序配置等
+	xml格式的数据具有通用性，绝大多数语言均支持对XML数据的解析 因此被用于不同语言之间 交换数据。
+	作为开放平台接口返回的数据，要求具有通用性，绝大多数语言都能使用。

##	**4.PHP解析XML**
存储在XML结构中的数据（XML文件内容、XML格式的字符串）需要被提取出来使用这个过程称为“解析” 它包括XML节点和节点数据（值）的操作。
###		**4.1SimpleXMLElement**
载入一段要解析的xml字符串 返回一个数据对象.
这是一个类。
```
<?xml version="1.0" encoding="utf-8" ?>
<info>
	<person id="1">
		<name>李白</name>
		<age>30</age>
		<gender>男</gender>
	</person>
	<person id="2">
		<name>杜甫</name>
		<age>36</age>
		<gender>男</gender>
	</person>
	<person id="3">
		<name>李清照</name>
		<age>22</age>
		<gender>女</gender>
		<content><![CDATA[<<>???///]]></content>
	</person>
</info>
```

```
$str=file_get_contents('xml.xml');
$obj=new SimpleXMLElement($str);
var_dump($obj);
```
结果：
```
object(SimpleXMLElement)[1]
  public 'person' => 
    array (size=3)
      0 => 
        object(SimpleXMLElement)[2]
          public '@attributes' => 
            array (size=1)
              ...
          public 'name' => string '李白' (length=6)
          public 'age' => string '30' (length=2)
          public 'gender' => string '男' (length=3)
      1 => 
        object(SimpleXMLElement)[3]
          public '@attributes' => 
            array (size=1)
              ...
          public 'name' => string '杜甫' (length=6)
          public 'age' => string '36' (length=2)
          public 'gender' => string '男' (length=3)
      2 => 
        object(SimpleXMLElement)[4]
          public '@attributes' => 
            array (size=1)
              ...
          public 'name' => string '李清照' (length=9)
          public 'age' => string '22' (length=2)
          public 'gender' => string '女' (length=3)
          public 'content' => 
            object(SimpleXMLElement)[5]
              ...
```


属性：
从数据对象中 取数据 属性要通过attributes()方法来取
`echo $obj->person[2]->attributes()->id;`
结果：
`3`
值：用->去访问，不写[index]表示第一个
`$obj->person[0]->name;`
结果
`李白`
$obj在根节点处

###		**4.2simplexml_load_string**
simplexml_load_string用来载入一段要解析的xml字符串，返回一个解析过的SimpleXMLElement对象。
这是一个方法，`simplexml_load_string($str)`相当于`new SimpleXMLElement($str)`

###		**4.3simplexml_load_file**
这是一个方法，`simplexml_load_file('xml.xml')`相当于
```
$str=file_get_contents('xml.xml');
new SimpleXMLElement($str)
```
###		**4.4Xpath**
XPath是一门在 XML 文档中查找信息的语言，XPath可用来在 XML 文档中对元素和属性进行遍历。
而且Xpath并不仅仅应用于XML数据查询，其在很多语言中（PHP、Java、.NET以及Javascript），都可以广泛使用。
使用Xpath定义路径表达式 可以按需查找节点 并返回集合形式。
1.使用/设置绝对路径的表达式
```
$path="/info/person/name";
$rs=$obj->xpath($path);
```
结果：
```
array (size=3)
  0 => 
    object(SimpleXMLElement)[2]
      public 0 => string '李白' (length=6)
  1 => 
    object(SimpleXMLElement)[3]
      public 0 => string '杜甫' (length=6)
  2 => 
    object(SimpleXMLElement)[4]
      public 0 => string '李清照' (length=9)
```
要写根节点

2.使用//全局查找 不考虑位置
```
$path="//name";
$rs=$obj->xpath($path);
var_dump($rs)
```
结果同上

3.使用..选取父节点`$path="//name/..";`选取name节点的父节点，也就是person

4.使用[]过滤节点，从1开始

5.使用@过滤属性`$path="//person[@id='1']";`

###		**4.5增删改**
保存修改：saveXML(路径)
1.addChild()
```
$obj->addChild("person",'content');
$obj->saveXml('xml.xml');
```
向已有节点中添加元素
```
$person=$obj->xpath("//person");
$person[0]->addChild("content",'111');
$obj->saveXml('xml.xml');
```

2.unset()
```
unset($obj->person[3]);
$obj->saveXml('xml.xml');
```
3.直接查找后=修改即可

附加：xml对象可以通过foreach遍历

##	**5.应用**
1.视频播放。
通常在网页播放视频时，因为视频的文件往往比较大需要较大的服务器空间，同时维护起来也很麻烦 ，就上传到外部服务器中，通过调用第三方平台的接口来获取地址信息，在自己的网站中显示该视频。
2.RSS订阅。
提炼出网页的主体内容（xml结构文件）推送给客户 这个称为“RSS订阅”，RSS文件是网页内容的提炼，也可以用在不同网站之间实现信息共享，需要有标准化的标签语义。
