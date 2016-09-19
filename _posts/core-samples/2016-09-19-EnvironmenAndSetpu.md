---
layout: post
category : lessons
tagline: "Supporting tagline"
tags : [intro, beginner, jekyll, tutorial]
---
{% include JB/setup %}

## 安装
### 安装ruby
&#160; &#160; &#160; &#160;Jekyll是用ruby开发的,因此为了运行Jekyll必须有一个ruby运行环境.我用的是ubuntu,因此只演示ubuntu中的安装.  
&#160; &#160; &#160; &#160;在ubuntu中安装ruby非常简单.打开软件中心(Software Center),输入ruby进行搜索,会出现Interpreter of object-oriented scripting language Ruby (default version),然后进行安装即可,这个安装无脑到家了,你都不需要点下一步.  
![ubuntuRuby安装]({{site.url}}/assets/img/rubyEnv.png)  
安装完毕之后要改变一下gem的库,因为ruby的中心仓库被屏蔽了,一定要换成淘宝的仓库.
>gem sources -l  
>gem sources --remove https://rubygems.org/  
>gem sources -a https://ruby.taobao.org/  
>gem sources -l

如果出现一下信息就证明安装成功了  
![taobaoRuby仓库]({{site.url}}/assets/img/taobaoSource.png)
### 安装Jekyll
```
gem install jekyll
jekyll  --version
```
如果正确安装的话会显示jekyll的版本号. 乘热打铁赶快新建一个jekyll工程出来.
> jekyll new helloWorld  
这样一个jekyll工程就建立好了.



