---

layout: post
category: springboot
title: springbootDubbo

---

# 本文应用自springboot微服务架构  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;不管是否使用SpringBoot，基于dubbo框架的服务从其服务的定义，到服务的实现，都是常规而无法省略掉工作，但是：  
. 服务完成后，启动main函数里的逻辑貌似每次都要编写一样的。  
. 服务完成后，以生么样的形式发布并部署？ zip包，还是jar包，war包，或其它方式。  
考虑到这些就回涉及到SpringBoot，一旦将dubbo服务以SpringBoot的方式进行封装，Dubbo服务就可以使用SpringBoot的开发的便捷性。  
&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;虽然我们无法省略和简化服务化的定义和实现这些步骤，但dubbo服务的main函数逻辑实际上是可以固化下来并且复用的，否则，每个人给出的Dubbo服务实现的启动类都有可能不一样，进而导致运维操作的不一致。在上一章的例子中，为例防止Dubbo服务的退出，我们通过IO阻塞，这是一个非常坏的做法。比较好的实现思路是为服务设置一个开关，只有当外部调用相应管理接口将服务关闭之后，在关闭当前的Dubbo服务。  
{% highlight java %}
public interface ShutdownLatchMBean {
    String shutdown();
}
public class ShutdownLatch implements ShutdownLatchMBean {
    protected AtomicBoolean running = new AtomicBoolean(false);
    
    public long checkIntervalInSeconds = 10;
    
    private String domain = "com.keevol.lifecycles";
    
    public ShutdownLatch(){
    
    }
    public ShutdownLatch(String domain){
        this.domain = domain;
    }
}
{% endhighlight %}



