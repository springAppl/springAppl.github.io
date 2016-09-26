---

category: springboot
layout: post
title: spring配置

---


## 本文引用自SpringBoot微服务架构，请购买正版。

### Spring配置  
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;IoC容器是在spring学习的过程中遇到最多的词汇之一。IoC就是控制翻转的意思。这里的控制指的是对应用中的对象实例化这种控制的翻转。在不使用IoC容器的情况下，实例化一个对象，采用的是new关键字。在采用了IoC容器的情况下，可以采用注解等形式，让spring的IoC容器帮你实例化对象，并管理对象的生命周期。DL（依赖查找）和DI（依赖注入）是IoC容器的一种实现方式，在为对象实例化的时候，首先DL查找该对象依赖哪些对象，查找到之后，DI把对象依赖的其它对象注入进去。下面具体讲解一下SpringIoC容器实例化对象的流程：  
#### 收集和注册  
第一阶段是构建和收集bean定义的阶段，在这个阶段中，用户可以通过xml或者java代码的方式定义一些bean，然后通过手动组装或者让容器基于某些自动机制自动扫描的形式，将这些bean定义收集到IoC容器当中。  
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
#### 分析和组装  
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;当第一阶段工作完成后，我们可以认为IoC容器中充斥着一个个独立的bean，它们之间没有任何关系。但实际上，它们之间是有依赖关系的，所以IoC容器在第二阶段要干的事情就是分析这些已经在IoC容器之中的bean，然后根据