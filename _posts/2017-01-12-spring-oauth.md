---
title: oauth
post: layout
category: security
---
## OAuth2 Authorization Grant types
An authoriztion grant is a credential representing the resource owner's authorization(to access its protected resources)used by the client to obtain an access token. The specification defines four grant types:
- authorization code
- implicit
- resource owner password credentials
- client credentials
We will be using resource owner password credentials grant type. The reason is simple, we are not implementing a view which
redirects us to a login page. Only the usage where a client have the Resource owner's credentials and they provide those credential to authorization server in order to eventually receive the access-token and then use that token to actually the 
resources.
A common example is the GMail app a[a client]on your smartphone which takes your credentials and use them to connect to GMail servers. It also shows thata password credentials Grant is best suited when both the client and the servers are from same
 companty as the trus is there. you don't want to provide your credentials to a third party.
AuthorizationEndpoint.java
RedirectView.java
InvocableHandlerMethod.java   invokeForRequest
ServletInvocableHandlerMethod.java    invokeAndHandle ServletWebRequest

请求应该是先到达过滤器, 在过滤器FilterChainProxy这里request是RequestFacade, response是ResponseFacade
在doFilterInternal中request被强转为FiredwalledRequest, response被强转为FiredwalledResponse,只有在
授权页面之前发的请求中,redirectURLCC的值才为null
请求最先到达的地方是DispatcherServlet.java   doservice  
曾经的我一直觉的spring深奥难懂,但是发现只要你恐惧的不是恐惧本身,是可以找到入口的.
如果猜想没有错tomcatResponse只初始化一次
答案的终点居然是tomcatresonse的toAbsolute()....












