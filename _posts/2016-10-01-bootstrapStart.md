---

layout: post
category: bootstrap
title: starter

---

# 介绍  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;bootstrap就是一个前端的工具 库,它预先做好了很多非常棒的样式和插件,可以让开发人员直接使用.下面时使用bootstrap时的最常见的引入方式(最小配置):  

{% highlight html %}
<!-- 新 Bootstrap 核心 CSS 文件 -->
<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">


<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>

<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

{% endhighlight %}  

当然你在本地开发时可能会没有网,可以把上面的路径换成本地的路径即可.bootstrap可以说时前端一个非常先进且流行的工具库,因为新版的bootstrap是基于html5设计的,因此bootstrap对移动端支持的非常好,pc端就只能呵呵了,但是现在chrome,firefox,mac浏览器已经对html5支持的非常好了.下面是一个典型的bootstrap页面:  

{% highlight html %}
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>

{% endhighlight %}  

前面我们已经说过了,bootstrap是基于html5的,而现在移动端对html5支持的又非常好,因此bootstrap是移动端优先的.在使用bootstrap一定要对html5有一下声明:  

{% highlight html %}
<!DOCTYPE html>
<html lang="zh-cn">
</html>
{% endhighlight %}  

