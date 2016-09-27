---

category: springboot
layout: post
title: spring配置

---


# 本文引用自SpringBoot微服务架构，请购买正版。

## Spring配置  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;IoC容器是在spring学习的过程中遇到最多的词汇之一。IoC就是控制翻转的意思。这里的控制指的是对应用中的对象实例化这种控制的翻转。在不使用IoC容器的情况下，实例化一个对象，采用的是new关键字。在采用了IoC容器的情况下，可以采用注解等形式，让spring的IoC容器帮你实例化对象，并管理对象的生命周期。DL（依赖查找）和DI（依赖注入）是IoC容器的一种实现方式，在为对象实例化的时候，首先DL查找该对象依赖哪些对象，查找到之后，DI把对象依赖的其它对象注入进去。下面具体讲解一下SpringIoC容器实例化对象的流程：  

### 收集和注册  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;第一阶段是构建和收集bean定义的阶段，在这个阶段中，用户可以通过xml或者java代码的方式定义一些bean，然后通过手动组装或者让容器基于某些自动机制自动扫描的形式，将这些bean定义收集到IoC容器当中。  
假设我们以XML配置（逐渐在变的不流行）的形式来收集并简单的注册bean，一般形式如下：  
{% highlight xml %}
<bean id="mockService" class="MockServiceImpl">
....
</bean>
{%  endhighlight  %}
如果感觉麻烦，可以让IoC容器自动扫描bean，并将它们注册进去，可以采用XML Schema形式的配置形式进行批量扫描并采集和注册：
{%  highlight xml %}
<context:component-scan base-package="com.keevol"/>
{% endhighlight %}  

### 分析和组装  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;当第一阶段工作完成后，我们可以认为IoC容器中充斥着一个个独立的bean，它们之间没有任何关系。但实际上，它们之间是有依赖关系的，所以IoC容器在第二阶段要干的事情就是分析这些已经在IoC容器之中的bean，然后根据它们之间的依赖关系先后组装它们。如果IoC容器发现A依赖B，IoC容器就回把B注入到A当中。  

### JavaConfig  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;java5推出后，加上基于Java Annotation的依赖注入框架Guice的出现，使得Spring框架推出并持续完善了基于java代码和Annotation元信息方式描述依赖关系。  
{% highlight java %}
@Configuration
public class MockConfiguration{
    
    @Bean
    public MockService mockService(){
        return new MockServiceImpl(dependencyService());
    }
    
    @Bean
    public DependencyService dependencyService(){
        return new DependencyService();
    }
}
{% endhighlight  %}
任何一个标注了@Configuration的java类定义都是一个JavaConfig配置类。  

> 从代码表述的逻辑来看，直觉上应该是回创建多个同一个类型的实例，但实际上仍然是Singleton的，spring通过拦截配置类的方法避免初始化多次同一方法对象多次，记住我这里用的是同一方法，而不是同一类型，因为spring是允许同一类型存在多个不同的实例的。  

#### 实用的Annotation  

1. @ComponentScan  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;@ComponentScan对应XML配置形式中的`<cotext:component-scan/>`用户配合java注解，它的作用就是告诉springIoC容器，这些注解在什么地方。用户可以通过basePackages等属性来细粒度的定制@ComponentScan自动扫描的范围，如果不指定，则默认Spring框架实现会从声明@ComponentScan所在类的Package进行扫描。  

2. @PropertySource与@PropertySources
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;@PropertySource用于从某些地方加载*.properties文件的内容，并将其中的属性加载到IoC容器当中，便于填充一些bean定义属性的占位符（placeholder），当然这需要PropertySourcesPlaceholderConfiguer的配合。如果用户采用的是Java8或者更高版本，那么可以并行声明多个@PropertySource：  

{% highlight java %}
@Configuration
@PropertySource("classpath:/1.properties")
@PropertySource("classpath:/2.properties")
@PropertySource("classpath:/3.properties")
public class XConfiguration{
    ...
}
{% endhighlight %}  

如果用户使用的jdk版本低于java8，但是又想要加载多个properties源，需要采用@PropertiesSources注解：  

{% highlight java %}
@Configuration
@PropertySources({
    @PropertySource("classpath:/1.properties")
    @PropertySource("classpath:/2.properties")
    @PropertySource("classpath:/3.properties")
})
public class XConfiguration{
    ...
}
{% endhighlight %}  

3. @Import与@ImportResource  
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;在XML形式的配置中，用户通过`<import resource="XXX.xml"/>`的形式将多个分开的容器组织到一个配置当中，在javaConfig的形式中，可以通过@Import完成相同的目的：  
{% highlight java %}
@Configuration
@Importan(MockConfiguration.class)
public class XConfiguration{

}
{% endhighlight %}  
但是正常情况下，没人这么做，一般都是配置一个@ComponentScan，将其它配置类自动扫描进来，所以了解这个注解的存在就可以了。
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;如果有一些遗留系统需要以XML形式来配置（比如dubbo），可以通过@ImportResource将XML形式的配置导入到IoC容器当中：  
{% highlight java %}
@Configuration
@ImportResource("classpath:/dubbo.xml")
public class XConfiguration{
    ...
}
{% endhighlight %}  

