---
layout: post
category : lessons
tags : [intro, beginner, jekyll, tutorial]
---
{% include JB/setup %}

## 配置你本地的Jekyll  

&#160; &#160; &#160; &#160; 这一章的内容可能会和前面的内容冲突，但是这张的内容是我从Github的官方文档上扒下来的，起专业性非常高。  

### 准备环境  

&#160; &#160; &#160; &#160; 安装ruby。这里列举一些常见的（最简单的）安装方式。  

#### Homebrew(OS X)  

在OS X（mac）上都是采用Homebrew来安装的。[Homebrew](http://brew.sh/)是mac上最流行的软件管理工具（没有之一）。  

> brew install ruby  

#### apt(Debian or Ubuntu)  

Debian系列的linux都是采用apt软件管理工具来进行安装。或者查看我之前的文章用SoftwareCenter进行安装。  

> sudo apt-get install ruby-full  

#### yum(CentOS, Fedora, or RHEL)  

这是红帽系列的linux采用yum软件管理工具进行安装。  

> sudo yum install ruby  

安装完毕之后用下面的命令检验一下：  

> ruby --version  

```
在上面这些软件管理工具中，只用OS X的Homebrew需要自己去安装，其它系统的软件管理工具都是系统自带的。而且我推荐使用ubuntu来进行安装。
原因如下，window直接忽略，OS X需要你有mac，红帽系列的系统不适合作为桌面环境，因为有非常多的坑等着你（当然也有可能是我的水平不够），
但作为企业级服务器的确是最流行的，至于ubuntu嘛，缺点不像它们那么明显，当然就是最大的优点来。
```  

&#160; &#160; &#160; &#160; 安装完ruby之后，就可以安装bundler了，Github推荐使用bundler，这是有道理的，因为采用bundler可以
极大的减少出错的可能性，而且还具有一些极其好用的特点，比如动态刷新（这样就不需要每修改一次就重启一次jekyll）和Github上的内容同步（这
样你就不用等博客上线了才知道你哪些样式显示错误）。 

#### 安装Bundler  

> gem install bundler  

### 创建Github博客仓库  

&#160; &#160; &#160; &#160; 为了在Github上创建博客，首先需要在Github上创建一个博客的仓库。只不过这个仓库的名称有些特殊，它和你
的Github账户名相关。例如你Github的账户名为king（好🐂的名字），那么你博客仓库的名字必须是这个`king.github.io`.明白这个命名规范了吧
就是账户名＋`.github.io`。然后将你的仓库克隆到本地。  

### 通过Bundler安装Jekyll  

&#160; &#160; &#160; &#160; 首先进入项目的根目录，是否有Gemfile。如果没有的话，就新建这个文件，把下面的语句填进去。  

```
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
```  

如果有的话，就把这语句填充在文件的末尾，一定要记住在文件的末尾。然后执行下面的命令安装Jekyll：  

> bundle install  

### 生成博客目录结构  

&#160; &#160; &#160; &#160; 你clone下来的目录结构是空的，这时你需要生成一个符合Jekyll习惯的目录结构，执行一下命令：  

> bundle exec jekyll new . --force  

删除Gemfile中类似下面的语句：  

> "jekyll", "3.2.1"  

删除掉下面这句话的`#`注释:  

> gem "github-pages", group :jekyll_plugins  

### 运行Jekyll  

&#160; &#160; &#160; &#160; 本地运行你的博客之需要输入一下命令，然后在浏览器中输入`http://localhost:4000`即可。  

> bundle exec jekyll serve  

### 更新Jekyll，做到和Github同步  

&#160; &#160; &#160; &#160; 因为Jekyll是一个比较活跃的项目，同时也为了减少本地和Github上显示的不一致问题，需要本地的jekyll和Github
上的一致。如果是采用bundler安装的话，只需要执行`bundle update`命令,如果是直接采用gem安装，执行`gem update github-pages`命令。  

## Next Steps

Please take a look at [{{ site.categories.api.first.title }}]({{ BASE_PATH }}{{ site.categories.api.first.url }})
or jump right into [Usage]({{ BASE_PATH }}{{ site.categories.usage.first.url }}) if you'd like.