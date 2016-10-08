---

category: springboot
layout: post
title: Signing in

---




## 4. Signing in with Service Provider Accounts  

springSocial提供两种三方登录的方式，`ProviderSignInController`和`SocialAuthenticationFilter`，现在只讲ProviderSignInController，因为它不涉及到springSecurity，相对要简单一些。  

### 4.2. Enabling provider sign in with ProviderSignInController  



ProviderSignInController works very much like ConnectController in that it goes through the OAuth flow (either OAuth 1 or OAuth 2, depending on the provider). Instead of creating a connection at the end of process, however, ProviderSignInController attempts to find a previously established connection and uses the connected account to authenticate the user with the application. If no previous connection matches, the flow will be sent to the application’s sign up page so that the user may register with the application.

To add provider sign in capability to your Spring application, configure ProviderSignInController as a bean in your Spring MVC application:
`ProviderSignInController`的工作方式和i`ConnectController`非常相似，都是根据不同的协议会用不同的授权流程，除来在流程结束的时候会创建一个connection之外，ProviderSignInController，并切会尝试获取一个曾经获取到到连接，并且使用该连接给应用上相关联的账户进行授权。如果没有相关联连接，流程会发送应用的注册页面供用户进行注册。为了实现三方登录你的应用，需要配置ProviderSignInController。  

{% highlight java %}


@Bean
public ProviderSignInController providerSignInController(
            ConnectionFactoryLocator connectionFactoryLocator,
            UsersConnectionRepository usersConnectionRepository) {
    return new ProviderSignInController(
        connectionFactoryLocator,
        usersConnectionRepository,
        new SimpleSignInAdapter(new HttpSessionRequestCache()));
}


{% endhighlight %}  

OAuth2的流程：  

```


    POST /signin/{providerId} - Initiates the sign in flow by redirecting to the provider’s authentication endpoint.

    GET /signin/{providerId}?code={verifier} - Receives the authentication callback from the provider, accepting a code. Exchanges this code for an access token. Using this access token, it retrieves the user’s provider user ID and uses that to lookup a connected account and then authenticates to the application through the sign in service.

        If the provider user ID doesn’t match any existing connection, ProviderSignInController will redirect to a sign up URL. The default sign up URL is "/signup" (relative to the application root), but can be customized by setting the signUpUrl property.

        If the provider user ID matches more than one existing connection, ProviderSignInController will redirect to the application’s sign in URL to offer the user a chance to sign in through another provider or with their username and password. The request to the sign in URL will have an "error" query parameter set to "multiple_users" to indicate the problem so that the page can communicate it to the user. The default sign in URL is "/signin" (relative to the application root), but can be customized by setting the signInUrl property.

        If any error occurs while fetching the access token or while fetching the user’s profile data, ProviderSignInController will redirect to the application’s sign in URL. The request to the sign in URL will have an "error" query parameter set to "provider" to indicate an error occurred while communicating with the provider. The default sign in URL is "/signin" (relative to the application root), but can be customized by setting the signInUrl property.


```