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

&#160; &#160; &#160; &#160; 上面是一个典型的Jekyll目录结构，下面我用表格的形式来一一讲解各个目录。  

| FILE/DIRECOTRY | DESCRIPTION |
|:-------|:--------|
| _config.yml | 从名字就可以看出这是一个配置文件，如果你对配置不了解不用担心，因为你会发现绝大部分采用默认配置即可。 |
| _drafts | 也从名字可以看出来就是草稿箱对意思，你可以把暂时正在编写，将来发表的文章放在这个目录下。 |  


## Next Steps

Please take a look at [{{ site.categories.api.first.title }}]({{ BASE_PATH }}{{ site.categories.api.first.url }})
or jump right into [Usage]({{ BASE_PATH }}{{ site.categories.usage.first.url }}) if you'd like.
