---

layout: post
category: springsocial
title: service provider

---



## 连接 Service Providers  

在前面的章节`connect framework`中介绍来如何通过ConnectionFacotry来获取连接，本章介绍如何在web环境中控制连接流程，在获取连接的过程中加入自己的业务逻辑。  

### 3.1 配置 ConnectController  
  
ConnectController会控制整个连接流程，ConnectController还依赖依赖其它实体来完成这项任务。在介绍这些之前，需要定义一个声明为@Configuration的配置类，我们会在这个配置类中定义各种springsocial需要用到的对象，包括前面提到的ConnectController。  

{% highlight java %}
@Configuration
@EnableSocial
public class SocialConfig implements SocialConfigurer {
  ...
}
{% endhighlight  %}  

其实真正获取连接的并不是ConnectionFactory，而是ConnectController，准确的说，应该是ConnectCtroller代理ConnectFactory去获取连接。一单获取到连接之后，ConnectController可以代理ConnectionRepository去存储连接数据。因此在配置时，需要配置多个ConnectionFactory和至少一个ConnectionRepository。  

To register one or more ConnectionFactory objects, override the addConnectionFactories() method from SocialConfigurer as follows:
通过覆盖SocialConfigurer.addConnectionFactories()方法注册一个或多个ConnectionFactory对象。  

{% highlight java %}
@Configuration
public class SocialConfig implements SocialConfigurer {

    @Override
    public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment env) {
        cfConfig.addConnectionFactory(new TwitterConnectionFactory(
            env.getProperty("twitter.consumerKey"),
            env.getProperty("twitter.consumerSecret")));
        cfConfig.addConnectionFactory(new FacebookConnectionFactory(
            env.getProperty("facebook.clientId"),
            env.getProperty("facebook.clientSecret")));
        cfConfig.addConnectionFactory(new LinkedInConnectionFactory(
            env.getProperty("linkedin.consumerKey"),
            env.getProperty("linkedin.consumerSecret")));
    }

    ...
}
{% endhighlight %}  

在上面的代码中，注册了三个ConnectionFactory，Facebook，Twitter，LinkedIn。因为在不同的环境下（测试，生产，开发），客户端id和screte是不同的，因此建议以外部配置的形式处理这些值。  

上面提到了存储Connection，ConnectionRepository会通过多个操作会建立一个用户和connection之间的映射并存储起来。在注入ConnectionRepository的时候需要注意一下，ConnectionRepository的声明周期，要和ConnectController一致。除了这些之外，一定要实现SocialConfigurer方法来配置UserConnectionRepository。  

{% highlight java %}
@Autowired
DataSource dataSource;

@Override
public UsersConnectionRepository getUsersConnectionRepository(ConnectionFactoryLocator connectionFactoryLocator) {
    return new JdbcUsersConnectionRepository(dataSource, connectionFactoryLocator, Encryptors.noOpText());
}

@Override
public UserIdSource getUserIdSource() {
    return new AuthenticationNameUserIdSource();
}
{% endhighlight %}  

> 有人可能会有疑惑，为什么ConnectionRepository的生命周期需要和ConnectController一致，scope是request，设想一下用户每次进行三方授权的时候出现建立连接的情况，这样就需要更新ConnectionRepository，来重现填充用户和Connection之间的映射。可以这样理解，把ConnectionRepository想想称缓存，每次请求都需要跟新一次饿缓存。  

上面提到了需要把ConnectionRepository的scope设置为requst，这样就需要确定当前用户。因此需要覆盖getUserIdSource方法来返回一个UserIdSource实例。可以通过AuthenticationNameUserIdSource来返回一个UserIdSource实例。使用AuthenticationNameUserIdSource会默认使用SpringSecurity来保护应用。  

### 3.2. 创建 ConnectController  

With its dependencies configured, ConnectController now has what it needs to allow users to establish connections with registered service providers. Now, simply add it to your Social @Configuration:
上述配置完毕之后，这样就可以通过ConnectController来获取连接了，只需要完成下面简单的配置即可：  

{% highlight java %}


@Configuration
public class SocialConfig {

    @Bean
    public ConnectController connectController(
                ConnectionFactoryLocator connectionFactoryLocator,
                ConnectionRepository connectionRepository) {
        return new ConnectController(connectionFactoryLocator, connectionRepository);
    }

}

{% endhighlight %}  

ConnectController支持OAuth1和OAuth2，ConnectController会根据请求的参数来选择不同的ConnectionFactory。当ConnectController从service provider处获取到connection之后，ConnectController会给service provider传递一个url，在用户获取到授权之后，供service provider回调。在创建回调url的时候，ConnectController会根据请求参数来决定回调url的协议，主机名，端口号。但是如果你的应用是在代理主机后面的话，你需要设置应用的externalURL来确保ConnectController会使用external来构建回调URL，而不是根据请求来构建回调URL。  

{% highlight java %}
@Configuration
public class SocialConfig {

    @Bean
    public ConnectController connectController() {
        ConnectController controller = new ConnectController(
            connectionFactoryLocator(), connectionRepository());
        controller.setApplicationUrl(environment.getProperty("application.url");
        return controller;
    }

}
{% endhighlight %}

对于不同的三方协议，ConnectController的流程是不同的，下面是OAuth2的流程：  

```


    GET /connect - Displays a web page showing connection status for all providers.

    GET /connect/{providerId} - Displays a web page showing connection status to the provider.

    POST /connect/{providerId} - Initiates the connection flow with the provider.

    GET /connect/{providerId}?code={code} - Receives the authorization callback from the provider, accepting an authorization code. Uses the code to request an access token and complete the connection.

    DELETE /connect/{providerId} - Severs all of the user’s connection with the provider.

    DELETE /connect/{providerId}/{providerUserId} - Severs a specific connection with the provider, based on the user’s provider user ID.


```  

需要注意的就是上面的这些请求，并不都是有客户端（浏览器）发出的，那就是，我们上面提到的回调函数`GET /connect/{providerId}?code={code}`.  

#### 3.2.1. Displaying a connection page  

显示Twitter的登录界面  

{% highlight html %}
<a href="<c:url value="/connect/twitter" />">Connect to Twitter</a>
{% endhighlight %}  

显示所有的登录界面  

{% highlight html %}
<a href="<c:url value="/connect" />">Your connections</a>
{% endhighlight  %}  

#### 3.2.2. Initiating the connection flow  

{% highlight html %}
<form action="<c:url value="/connect/twitter" />" method="POST">
    <p>You haven't created any connections with Twitter yet. Click the button to create
       a connection between your account and your Twitter profile.
       (You'll be redirected to Twitter where you'll be asked to authorize the connection.)</p>
    <p><button type="submit"><img src="<c:url value="/resources/social/twitter/signin.png" />"/>
    </button></p>
</form>
{% endhighlight %}  

#### 3.2.3. Authorization scope  

{% highlight html %}
<form action="<c:url value="/connect/twitter" />" method="POST">
    <input type="hidden" name="scope" value="publish_stream,offline_access" />
    <p>You haven't created any connections with Twitter yet. Click the button to create
       a connection between your account and your Twitter profile.
       (You'll be redirected to Twitter where you'll be asked to authorize the connection.)</p>
    <p><button type="submit"><img src="<c:url value="/resources/social/twitter/signin.png" />"/>
    </button></p>
</form>
{% endhighlight %}  

#### Responding to the authorization callback  

当service provider调用回调函数的时候会返回一个code参数，这个code参数可以转换为access token。  

#### 3.2.5. Disconnecting  

{% highlight html %}
<form action="<c:url value="/connect/twitter" />" method="post">
  <div class="formInfo">
    <p>
      Spring Social Showcase is connected to your Twitter account.
      Click the button if you wish to disconnect.
    </p>
  </div>
  <button type="submit">Disconnect</button>
  <input type="hidden" name="_method" value="delete" />
</form>
{% endhighlight %}  

### 3.3. Connection interceptors  









