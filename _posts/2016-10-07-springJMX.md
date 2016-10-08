---

layout: post
title: springJMX
category: spring

---

# springJMX  

`有多少次您曾经注视着运行中的应用程序，问自己：“它到底在做什么？为什么用了这么长时间呢？” 在这些时刻，您可能会想如果自己在应用程序中构建了更多的监视功能就好了。例如，在服务器应用程序中，能够查看排队等候处理的任务的数量和类型、当前正在处理的任务、过去一分钟或一小时内的吞吐量统计、平均任务处理时间等。这些统计值容易搜集，但是在需要数据的时候，如果没有非侵入性的数据检索机制，那么这些值就不太有用`  －－Brian Goetz (brian.goetz@sun.com)  

我认为上面这段话最能说明JMX的一般应用场景了。随着spring的发展（尤其是springBoot），用springBoot开发应用相比以前的到了极大的简化。这里就不介绍JMX的最本质的通过java的使用方式了（太麻烦了，我也不会），直接介绍JMX和spring的整合方式。  

为了声明一个MBean，你只需要声明一个普通的pojo就可了：  

{% highlight java %}
public class Hello {
    private String name;
    private int age;
    private boolean isSuperman;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int add(int x, int y) {
        return x + y;
    }

    public void dontExposeMe() {
        throw new RuntimeException();
    }
    public String say(){
        System.out.println("hello");
        return "hello";
    }
}
{% endhighlight %}  

接下来需要做的就是声明一个MBeanServer，并把刚刚声明的MBean Hello实例注入到MBeanExporter中，下面是javaConfig的形式：  

{% highlight java %}
@Configuration
public class JMXConfig {
    @Bean
    public MBeanServerFactoryBean mbeanServer(){
        return new MBeanServerFactoryBean();
    }

    @Bean
    public Hello hello(){
        Hello hello = new Hello();
        hello.setName("liushaofei");
        hello.setAge(1000);
        return hello;
    }

    @Bean
    public MBeanExporter exporter(){
        MBeanExporter exporter = new MBeanExporter();
        Map<String, Object> beans = new HashMap();
        beans.put("bean:name=hello", hello());
        exporter.setBeans(beans);
        return exporter;
    }
}
{% endhighlight %}  

这样全部的配置就完成了。启动springBoot和JConsole吧。

