---
layout: post
category : lessons
tagline: "Supporting tagline"
tags : [intro, beginner, jekyll, tutorial]
---
{% include JB/setup %}

##观其大略  SpringSocial  

### 范围划分  

模块职能的划分

实现流程  

### 订立目标  

1小时内看完第三章，了解如何配置，并写提纲。  

Connection to Service Providers  

&#160; &#160; &#160; &#160; spring-social-web模块提供了一个SpringMVC控制器ConnectController，ConnectController封装了应用到ServiceProvider之间的连接流程。  
ConnectController关注的是如何将用户代理的请求重定向到ServiceProvider那里，让用户开始进行验证，当验证完毕后，在把响应返回给回调函数。  

#### Configuring ConnectController  

&#160; &#160; &#160; &#160; ConnectController重定向客户端代理是一个比较复杂的流程，它会涉及到一些其它的对象。在开始整个流程的讲解之前先了解一下ConnectController的配置。  
因此首先需要声明一个配置类:  

```
@Configuration
@EnableSocial
public class SocialConfig implements SocialConfigurer {
  ...
}
```  
&#160; &#160; &#160; &#160; ConnectController对于Connection是通过ConnectionFactory来获取的，ConnecController想要获取不同的连接  
例如（FaceBoot，twriter，github），ConnectController都会将获取连接的任务委派给不同的ConnectionFactory，让这些Connection以用户代理的  
身份从ServiceProvider那里获取Connection。一旦获取连接之后，它还回委派一个ConnectionRepository去保存Connection。因此需要配置多个不同的  
ConnectionFactory和一个ConnectionRepository。下面是如何注册这些ConnectionFactory和ConnectionRepository：  

```
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
```  

ConnectController对于各种不同的三方登录协议的控制流逝非常不同的，对于OAuth－2来说：  

- GET /connect - Displays a web page showing connection status for all providers.

- GET /connect/{providerId} - Displays a web page showing connection status to the provider.

- POST /connect/{providerId} - Initiates the connection flow with the provider.

- GET /connect/{providerId}?code={code} - Receives the authorization callback from the provider, accepting an authorization code. Uses the code to request an access token and complete the connection.

- DELETE /connect/{providerId} - Severs all of the user’s connection with the provider.

- DELETE /connect/{providerId}/{providerUserId} - Severs a specific connection with the provider, based on the user’s provider user ID.  

#### Displaying a connection page  

```
<a href="<c:url value="/connect" />">Your connections</a>
```  

#### Initiating the connection flow  

```
<form action="<c:url value="/connect/twitter" />" method="POST">
    <p>You haven't created any connections with Twitter yet. Click the button to create
       a connection between your account and your Twitter profile.
       (You'll be redirected to Twitter where you'll be asked to authorize the connection.)</p>
    <p><button type="submit"><img src="<c:url value="/resources/social/twitter/signin.png" />"/>
    </button></p>
</form>
```  

#### Authorization scope  

```
<form action="<c:url value="/connect/twitter" />" method="POST">
    <input type="hidden" name="scope" value="publish_stream,offline_access" />
    <p>You haven't created any connections with Twitter yet. Click the button to create
       a connection between your account and your Twitter profile.
       (You'll be redirected to Twitter where you'll be asked to authorize the connection.)</p>
    <p><button type="submit"><img src="<c:url value="/resources/social/twitter/signin.png" />"/>
    </button></p>
</form>
```  

#### Responding to the authorization callback  

```
ConnectController will handle the callback request and trade in the verifier/code for an access token. Once the access token has been received, the OAuth dance is complete and the application may use the access token to interact with the provider on behalf of the user. The last thing that ConnectController does is to hand off the access token to the ConnectionRepository implementation to be stored for future use.
```  
似乎回调函数也不需要程序员去处理.  

### Signing in with Service Provider Accounts  

为了简化用户的注册，许多应用允许用户通过三方用户进行注册。通过授权技术，应用尽量把三方用户和本地用户关联起来。如果关联到到话，用户就会自动登录到程序。  

## Next Steps

Please take a look at [{{ site.categories.api.first.title }}]({{ BASE_PATH }}{{ site.categories.api.first.url }})
or jump right into [Usage]({{ BASE_PATH }}{{ site.categories.usage.first.url }}) if you'd like.
