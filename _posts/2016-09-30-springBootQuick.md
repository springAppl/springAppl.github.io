---

layout: post
category: springboot
title: spring快速构建应用

---

# springBoot

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;对于我看来springBoot对我最直观的感受就是,在写demo时再也不用写xml了,创建web应用也不用依赖
容器了(tomcat等).因此这篇文章的目的就是将springBoot玩的低端,玩的简单.同时为了支持正版,我不会采用idea来进行演示,我会采用STS.STS可以说是专
门针对开发spring应用的一个定制版eclipse.

{% highlight java %}
package org.spring.liu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class QuickStartApplication {

        public static void main(String[] args) {
                SpringApplication.run(QuickStartApplication.class, args);
                System.out.println("Hello the world!");
        }
}
{% endhighlight %}

这段代码只有`System.out.pringln("Hello the world")`是我自己写的.其他的都是借助eclipse生成的,而且这种生成也是很有必要的,当然这种又必要的,它只添加了`SpringApplication.run(QuickStartApplication.class, args);`就可以让一个复杂的spring应用想启动`helloworld`程序一样简单的启动.
