---

layout: post
category: springsocial
title: connect framework

---

# 本文引用自SpringBoot微服务架构，请购买正版。  

## 2 Connect Framework  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;`spring-social-core` 模块提供了connect  framework用来管理从service provider哪里获得的连接（connection，springSocial把这种连接抽象为connection）。一单获取了这种连接，就可以通过connection调用serviceProvider中已经被授权的接口。例如豆瓣被Paul授权了向好友发消息的接口，豆瓣就可以操作该接口给Paul的朋友推荐电影了。  

### 2.1 Core API  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;`Connection<A>`抽象了和service provider之间的连接：  

{% highlight java %}
public interface Connection<A> extends Serializable {

    ConnectionKey getKey();

    String getDisplayName();

    String getProfileUrl();

    String getImageUrl();

    void sync();

    boolean test();

    boolean hasExpired();

    void refresh();

    UserProfile fetchUserProfile();

    void updateStatus(String message);

    A getApi();

    ConnectionData createData();

}

{% endhighlight %}  

ConnectionKey是唯一的，它是由providerId（eg：Facebook）和userId（eg：123456）计算出来的，因此具有唯一性。  

A代表Connection连接的serviceprovider对应的本地Api，可能会有以下值：Connection<Facebook>, Connection<Twitter>.可以通过调用用A来操纵在对应serviceprovider上的账户。可以通过getApi()获取。  



To put this model into action, suppose we have a reference to a Connection<Twitter> instance. Suppose the connected user is the Twitter user with screen name jbauer.

    Connection#getKey() would return (twitter, 14710604) where 14710604 is @jbauer’s Twitter-assigned user id that never changes.

    Connection#getDisplayName() would return @jbauer.

    Connection#getProfileUrl() would return http://twitter.com/jbauer.

    Connection#getImageUrl() would return http://a0.twimg.com/profile_images/105951287/IMG_5863_2_normal.jpg.

    Connection#sync() would synchronize the state of the connection with @jbauer’s profile.

    Connection#test() would return true indicating the authorization credentials associated with the Twitter connection are valid. This assumes Twitter has not revoked the AcmeApp client application, and @jbauer has not reset his authorization credentials (Twitter connections do not expire).

    Connection#hasExpired() would return false.

    Connection#refresh() would not do anything since connections to Twitter do not expire.

    Connection#fetchUserProfile() would make a remote API call to Twitter to get @jbauer’s profile data and normalize it into a UserProfile model.

    Connection#updateStatus(String) would post a status update to @jbauer’s timeline.

    Connection#getApi() would return a Twitter giving the client application access to the full capabilities of Twitter’s native API.

    Connection#createData() would return ConnectionData that could be serialized and used to restore the connection at a later time.  
    
### 2.2 获得连接  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;service provider是通过各种三方协议来提供服务的，但是三方协议有很多种，比如OAth1，OAth2，http等。springSocial是通过各种不同的ConnectionFactory来提供Connection获取的.  

#### 2.2.1 OAuth2 service providers  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;OAuth 2正在逐渐取代其它协议成为主流协议，而且很多的一流公司都在使用OAuth2例如google，facebook，github等。  

{% highlight java %}
public class OAuth2ConnectionFactory<A> extends ConnectionFactory<A> {

    public OAuth2Operations getOAuthOperations();

    public Connection<A> createConnection(AccessGrant accessGrant);

    public Connection<A> createConnection(ConnectionData data);

    public void setScope(String scope);

    public String getScope();

    public String generateState();

    public boolean supportsStateParameter();

}
{% endhighlight  %}  


`getOAuthOperations()`会返回一个API实体处理与serviceprovider的认证流程。整个认证流会返回AccessGrant,调用AccessGrant.createConnection()会返回一个与本地账户相关的Connection。下面是OAuthOperations接口：  

{% highlight java %}
public interface OAuth2Operations {

    String buildAuthorizeUrl(OAuth2Parameters parameters);

    String buildAuthorizeUrl(GrantType grantType, OAuth2Parameters parameters);

    String buildAuthenticateUrl(OAuth2Parameters parameters);

    String buildAuthenticateUrl(GrantType grantType, OAuth2Parameters parameters);

    AccessGrant exchangeForAccess(String authorizationCode, String redirectUri,
        MultiValueMap<String, String> additionalParameters);

    AccessGrant exchangeCredentialsForAccess(String username, String password,
        MultiValueMap<String, String> additionalParameters);

    AccessGrant refreshAccess(String refreshToken,
        MultiValueMap<String, String> additionalParameters);

    AccessGrant authenticateClient();

    AccessGrant authenticateClient(String scope);

}
{% endhighlight %}  

下面的例子展示了如何使用FacebookConnectionFactory来通过OAuth2协议创建一个到Facebook的连接。FacebookConnectionFacotry是OAuth2ConnectionFactory的子类。  

{% highlight java  %}

FacebookConnectionFactory connectionFactory =
    new FacebookConnectionFactory("clientId", "clientSecret");
OAuth2Operations oauthOperations = connectionFactory.getOAuthOperations();
OAuth2Parameters params = new OAuth2Parameters();
params.setRedirectUri("https://my-callback-url");
String authorizeUrl = oauthOperations.buildAuthorizeUrl(params);
response.sendRedirect(authorizeUrl);

// upon receiving the callback from the provider:
AccessGrant accessGrant = oauthOperations.exchangeForAccess(authorizationCode, "https://my-callback-url", null);
Connection<Facebook> connection = connectionFactory.createConnection(accessGrant);

{% endhighlight %}  

#### 2.2.3. 注册 ConnectionFactory  


有两种注册方法，一种是覆盖`SocialConfigurer's addConnectionFactories()`方法，另一种是通过`ConnectionFactoryLocator`接口。  
覆盖`SocialConfigurer's addConnectionFactories()`方法:
{% highlight java %}
@Override
public void addConnectionFactories(ConnectionFactoryConfigurer cfConfig, Environment env) {
	cfConfig.addConnectionFactory(new TwitterConnectionFactory("clientId", "clientSecret"));
	cfConfig.addConnectionFactory(new TwitterConnectionFactory("consumerKey", "consumerSecret"));
	cfConfig.addConnectionFactory(new LinkedInConnectionFactory("consumerKey", "consumerSecret"));
}
{% endhighlight %}  

ConnectionFactoryLocator接口  

{% highlight java %}


public interface ConnectionFactoryLocator {

    ConnectionFactory<?> getConnectionFactory(String providerId);

    <A> ConnectionFactory<A> getConnectionFactory(Class<A> apiType);

    Set<String> registeredProviderIds();

}


{% endhighlight %}

