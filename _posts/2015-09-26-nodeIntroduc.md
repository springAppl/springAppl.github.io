---

layout: post
category: nodejs
title: module

---

## voerview  

long long ago, javascript就一直在探索本地编程的路，但优势基本可以忽略不计，因此没人用。它却少很多功能：
javascript 没有模块系统。没有原生的支持封闭作用域或依赖管理。
javascript没有标准库。除了一些核心功能之外，没有文件系统api，没有io流等。
javascript没有标准接口。没有如web Server或者数据库的同一接口。
javascript没有包管理系统。不能自动加载和安装依赖。

基于这些原因边有了CommonJS，其目的是为了构建JavaScript在包括webServer，桌面，命令行，及浏览器方面的使用。
CommonJs制定了解决这些问题的一些规范，而Node.js就是这些规范的一种实现。Node.js自身实现了require方法作为其引入模块的方法，同时npm也基于CommonJS定义的包规范，实现了依赖管理和模块自动安装等功能。
在nodeJS中，定义一个模块十分方便。下面是计算圆形等面积和周长。
{% highlight java  %}
var PI = Math.PI;
exports.area = function (r) {
    return PI * r * r;
};

exports.circumference = function (r) {
    return 2 * PI * r;
};

{% endhighlight %}
将这个文件保存为circle.js, 并新建一个app.js,并新建一个app.js文件，写以下代码:
{% highlight java %}
var circle = require("./circle.js");
console.log( 'The area of a circle of radius 4 is '  + circle.area(4) );
{% endhighlight  %}
在require了这个文件之后，定义在exports对象上等方法便可以随意调用。NodeJS将模块等定义和调用都封装的极其简单。

## 模块的载入策略  

NodeJS的模块分为两类，一类为原生（核心）模块，一类为文件模块。原生模块在NodeJS源代码编译的时候就加载了。而文件模块是动态加载的。但是NodeJS对原生模块和文件模块都进行了缓存，于是在第二次require是，是不回有开销的。其中原生模块都被定义在lib这个目录下面。

Node.js能够在众多的后单javascript技术中脱颖而出，正是由于其基于事件的特点。

在NodeJS中大部分的模块，都继承自Even模块。Event模块是一个简单的事件监听器模式的实现。从另一个角度来看，事件监听器模式也是一种事件钩子的机制，利用事件的钩子导出内部数据或状态给外部调用。
{% highlight java  %}
var options = {
    host: 'www.google.com',
    port: 80,
    path: '/upload',
    method: 'POST'
};

var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode );
    console.log('HEADERS:' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY:' + chunk);
    });
});

req.on('error', function (e) {
    console.log('problem with request:' + e.message);
});
req.write('data\n');
req.write('data\n');
req.end();
{% endhighlight  %}









































