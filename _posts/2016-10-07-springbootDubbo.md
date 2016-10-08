---

layout: post
title: dubboService
category: springboot

---  

# Dubbo  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;Dubbo是一个分布式服务框架。这是dubbo的官方定义，可以知道两个信息，dubbo本质上是一个服务框架，但有一个很重要的特点，它可以做分布式服务。本文只研究dubbo作为服务框架的作用。  

## Introduction  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;首先讲解一下什么是面向服务。也就是常常说道的SOA.SOA是指在开发应用时，将应用进行模块化的划分，然后将各个模块作为独立的应用进行开发，测试和发布。例如要开发一个web项目，将这个web项目划分为两个模块，一个用来处理业务逻辑，也就是我们常说的controller模块；另一个是数据访问模块，也就是除去controller模块的其它模块，例如service，dao等等，暂时称之为dao模块。很显然controller模块是依赖dao模块的。这时dao模块可以采用接口暴露的方式提供自己的服务。controller模块可以通过服务框架获取到dao模块提供的服务。其实看到这里你可能会发现，这是一个典型的生产者，消费者模式。其中生产者是dao，消费者是controller，而生产者，消费者之间的协议就是服务协议。说了这么多，dubbo协议就是服务协议的一个实现方案。

## 使用  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;Dubbo的使用是非常简单的，但是讲解如何使用缺很麻烦，直接通过一个最金典的helloworld例子进行演示。首先划分三个模块，provider，consumer，service模块。  
service模块定义了服务接口：  

{% highlight java %}
public interface Hello {
    String say();
}
{% endhighlight %}  

provider提供了Hello接口的实现：  

{% highlight java %}
public class HelloImpl implements Hello {
    public String say() {
        return "Hello";
    }
}
{% endhighlight %}  
除此之外，provider需要将HelloImpl以Hello接口的形式声明出去供consumer模块使用，因此需要一下的xml配置：  

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://code.alibabatech.com/schema/dubbo
        http://code.alibabatech.com/schema/dubbo/dubbo.xsd
        ">



    <!-- 提供方应用信息，用于计算依赖关系 -->
    <dubbo:application name="provider"/>


    <!--使用zookeeper注册中心暴露服务地址,2181是zookeeper的地址 -->

    <dubbo:registry address="zookeeper://127.0.0.1:2181" />

    <!--  用dubbo协议在20880端口暴露服务,消费者需要访问20880来获取provider上的服务 -->
    <dubbo:protocol name="dubbo" port="20880" />

    <!-- 声明需要暴露的服务接口 -->
    <dubbo:service interface="org.dubbo.liu.service.Hello" ref="helloService" />

    <!-- 具体的实现bean -->
    <bean id="helloService" class="org.dubbo.liu.service.HelloImpl" />
</beans>
{% endhighlight %}  

为了保证provider模块不结束，将provider模块阻塞掉：  

{% highlight java %}
public class ProviderBoot {

    public static void main(String[] args) throws IOException {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:/dubbo.xml");
        System.in.read(); // 为保证服务一直开着，利用输入流的阻塞来模拟
    }
}
{% endhighlight %}  

> 这里已定要阻塞provider模块，不然的话，consumer没来得及调用provider提供的服务，provider就先结束了  


consumer模块需要配置如何获取Hello服务:  

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://code.alibabatech.com/schema/dubbo
        http://code.alibabatech.com/schema/dubbo/dubbo.xsd
        ">

    <!-- 消费方应用名，用于计算依赖关系，不是匹配条件，不要与提供方一样 -->
    <dubbo:application name="consumer" />


    <dubbo:registry address="zookeeper://127.0.0.1:2181" />

    <!-- 生成远程服务代理，可以像使用本地bean一样使用demoService -->
    <dubbo:reference id="helloService" interface="org.dubbo.liu.service.Hello" />


</beans>
{% endhighlight %}
consumer可以调用Hello服务：  

{% highlight java %}
public class ConsumerBoot {
    public static void main(String[] args) throws IOException {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:/dubbo.xml");
        Hello hello = (Hello) context.getBean("helloService");
        System.out.println(hello.say());
    }
}
{% endhighlight %}  

## 配置参考  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;dubbo的配置方式其实和maven的配置方式有点神似，但型不似。maven的作用就是帮组解决应用开发时jar包的依赖问题，dubbo解决的是服务注册和依赖的问题（多了一个注册）；maven采用groupId，artifactId，version定位一个jar，dubbo采用group，interface，version定位一个服务；maven可以配置自己的maven仓库，默认是central仓库，dubbo必需配置自己的服务仓库，因为没有默认配置。
具体都配置参考dubbo的官方文档的[地址](http://dubbo.io/User+Guide-zh.htm#UserGuide-zh-%E9%85%8D%E7%BD%AE%E5%8F%82%E8%80%83%E6%89%8B%E5%86%8C)