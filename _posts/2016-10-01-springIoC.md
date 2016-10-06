---

layout: post
category: spring
title: profile

---

# 灵活的spring配置  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;之前已经讲过IoC容器和基于javaConfig的配置形式,这里就不在赘述了.本文主要讲解spring注入中一些灵活的配置.但是一般情况下,建议不要使用,因为spring推荐的也是约定由于配置,尽量少配置,但是在碰到碰到问题时,使用他们会收到奇效.  

在软件开发时经常碰到的一个问题就是开发环境,生产环境,测试环境是不同的,虽然他们的业务逻辑相同.这时候作为一个开发人员你会怎么做,难道每次测试,或者部署到生产环境的时候都要将参数改一遍吗,当然比较牛逼的方式就是写两套不同的配置文件,在部署不同的环境时加载不同的配置文件.但是要记住并不是所有的配置都可以写在外部的配置文件当中的.为此spring提供了一种比较好的解决思路,就是@Profile.  

## @Profile注解  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;从名字就可以猜出这个注解和配置有关.它的作用就是在加载配置时根据激活参数判断选择激活不同的配置.它的使用方式主要有两种,一种声明在类上,另一中是声明@Bean上.声明在类上就是把对应的类中的配置加载,声明在Bean上,当然就是把对应的Bean加载了.  

#### 类级别

{% highlight java %}
@Configuration
@Profile("test")
public class TestConfigurtion{

    @Bean
	public  DataSource dataSource(){
	    BasicDataSource dataSource = new BasicDataSource();
		dataSource.setUrl("jdbc:h2:tcp://dbserver/testDB");
		dataSource.setDriverClassName("org.h2.Driver");
	}
	
	......
}
{% endhightlight  %}  

#### @Bean级别  

{% highlight java %}

public class DataSourceTest{

    @Bean
	@Profile("teest")
	public DataSource dataSource(){
	    BasicDataSource dataSource = new BasicDataSource();
		dataSource.setUrl("jdbc:h2:tcp://dbserver/testDB");
		dataSource.setDriverClassName("org.h2.Driver");
	}
	
	@Bean
	@Profile("dev")
	public DataSource dataSource(){
	    BasicDataSource dataSource = new BasicDataSource();
		dataSource.setUrl("jdbc:mysql://localhost:3306/devDB");
		dataSource.setDriverClassName("com.org.jdbc.mysql.Driver");
		dataSource.setUserName("xxxx");
		dataSource.setPassword("xxxx");
	}

}

{% endhightlight %}  

我个人推荐大家采用第一种的配置方式,因为如果采用第二种的花中感觉配置很乱.
配置的选择方式将完了.spring是通过spring.profiles.active和spring.profiles.default这连个参数配置来指定当前的环境的.