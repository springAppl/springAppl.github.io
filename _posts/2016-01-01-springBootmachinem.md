---

layout: post
category: springboot
title: SpringBoot工作机制

---

# 本文引用自SpringBoot微服务架构，请购买正版。  

## SpringBootApplication原理  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;@SpringBootApplication这个注解并不是什么新“轮子”，只是将一堆好用的轮子组合起来成为一个更加好用的轮子而已。这是@SpringBootApplication的组成：  

{% highlight java %}
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Configuration
@EnableAutoConfiguration
@ComponentScan
public @interface SpringBootApplication{
    ....
}
{% endhighlight %}  

虽然由这么多注解组成，但是真正起作用的是@Configuration,@EnableConfiguration,@ComponentScan.@Configuration和Component之前已经讲过，这里就不赘述了，只讲解@EnableConfiguration。  

### @EnableAutoConfiguration  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;只以前使用Spring的时候，我们可能遇到过各种@EnableXXXX,但最常见的应该就是@EnableWebMvc了，就是启用mvc的一些默认配置。@EnableAutoConfiguration的意思启用自动配置。下面是@EnableAutoConfiguration的组成：  

{% highlight java %}
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(EnableAutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration{
    ....
}  
{% endhighlight %}  

其中最重要的就是@Import(EnableAutoConfigurationImportSelector.class),借助EnableAutoConfigurationImportSelector.class,@EnableAutoConfiguration可以把SpringBoot应用中，所有符合条件的@Configuration配置都加载到IoC容器当中（具体什么条件我目前也不清楚）。  

首先需要从SpringFactoriesLoader说起，SpringFactoriesLoader并不是用来加载工厂Bean的，而是用来加载classpath路径下的MATE-INF/spring.factories中配置信息。其中存储的信息是以key=value的形式存储的，但有个特点，key和value都是类的全路径名。然后将其中org.springframework.boot.autoconfigure.EnableAutoConfiguration对应的配置项中对应的配置类加载到IoC容器当中。
