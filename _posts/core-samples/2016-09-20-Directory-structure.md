---
layout: post
category : lessons
tagline: "Jekyll 目录结构"
tags : [intro, beginner, jekyll, tutorial]
---
{% include JB/setup %}

## 目录结构  

```
.
├── _config.yml
├── _drafts
|   ├── begin-with-the-crazy-ideas.md
|   └── on-simplicity-in-technology.md
├── _includes
|   ├── footer.html
|   └── header.html
├── _layouts
|   ├── default.html
|   └── post.html
├── _posts
|   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
|   └── 2009-04-26-barcamp-boston-4-roundup.md
├── _data
|   └── members.yml
├── _site
├── .jekyll-metadata
└── index.html
```  

&#160; &#160; &#160; &#160; 上面是一个典型的Jekyll目录结构，下面我会一一讲解各个目录。  

_config.yml: 配置文件  

_drafts: 草稿箱  

_includes: 放置一些和布局相关的文件.  

_layouts:  放置布局文件,一般情况下有default.html, post.html,当然也可以自定义一些其他文件.  

_posts: 放置博客文章的文件,文件必须遵循这样的命名规范例如:2014-09-20-Spring.md, xxxx-xx-xx-articleName.md.  

_data: 将一些数据文件放在这里,例如.yml,.yaml,.json, or .cvs例如有members.yml在这个目录下,通过site.data.members
就可以访问这些数据,可能这只是数据库的一种临时替代方案吧.  

_site: 将jekyll转换后的文件存放在这里,因此建议将该目录添加到.gitignore文件中.  

.jekyll-metadata: 这是jekyll的文件改动跟踪记录,它记录了那些文件改动了,需要下次jekyll build的时候需要转换.  

_asserts: 这个文件夹用来保存资源文件,例如css,图片,js等等.  


## Next Steps

Please take a look at [{{ site.categories.api.first.title }}]({{ BASE_PATH }}{{ site.categories.api.first.url }})
or jump right into [Usage]({{ BASE_PATH }}{{ site.categories.usage.first.url }}) if you'd like.
