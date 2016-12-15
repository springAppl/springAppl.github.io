---
title: springsocial
category: social
layout: post
---
As discussed in Persisting connections, ConnectionRepository defines operation for persisting and restoring connections for a special user. Therefore, when configuring a ConnectionRepository bean for use by ConnectController, it must be scoped such that it can be created on a per-user basis.
But rather than configure a ConnectionRepository bean directly and worry about remembering to scope it to request scope, all we must do is configure the UsersConnectionRepository bean by implementing getUsersConnectionRepository() from SocialConfigured:
Internally, Spring Social's configuration support will use the UsersConnectionRepository to create request-scoped ConnectionRepository bean. In doing so, it must identify the current user. Therefore, we must also override the getUserIdSource() to return an instance of a UserIdSource.
In this case, we're returning an instance of AuthenticationNameUserIdSource. This implementation of the UserIdSource interface assumes that the application is secured with Spring Security. It uses the SecurityContextHolder to lookup a SecurityContext, and from that return the name property of the Authentication object.
If your application isn't secured with Spring Security, you'll nedd to implement the UserIdSource interface as approprate for your application's security mechanism. The UserIdSource interface looks like thia:
{% highlight java %}
package org.springframework.social;
public interface UserIdSource {
    String getUserId();
}
{% endhighlight %}
## 3.2 Creating connections with ConnectController
With its dependencies configured, ConnectController now has what it needs to allow users to establish connections with registered service providers. Now, simply add it your Social @Configuration:



## 5.2 Developing a Java binding to the provider's API
API binding: 比如一个社交网站,某些接口只有注册用户才可以使用,例如查询用户信息,设置密码等等, 这些接口都是绑定到社交网站的账户上的.因此Java binding可以说是一种抽象,模拟了社交网站的账户对象.
### 5.2.2 Implementing a new Java API binding
API developers are free to implement their API
























### 5.3.1 Designing a new Java API binding



























