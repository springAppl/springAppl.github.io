---

layout: post
category: springsocial
title: introduction

---

# 本文引用自SpringBoot微服务架构，请购买正版。

## 介绍  

### 1.1 社交应用  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;社交应用就是将人与人连接起来，相互交流的应用。它和传统应用在数据上有一定的区别，它存储的都是用户的生活数据，而且用户也更加趋向于将这些生活数据分享出去。因此在考虑了上述特定之后，社交应用其实也更加趋向于将自己的数据分享出去，将自己和其它应用连接起来。  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;考虑一下这样一个场景，Paul是豆瓣的一员。豆瓣的一个作用就是向用户推荐电影，并且纪录用户看过哪些电影，其中有哪些是喜欢的，哪些是不喜欢的，豆瓣可以通过这些数据分析出Paul更喜欢什么样的电影，从而改善对Paul的电影推荐。从功能上来说，豆瓣可以帮助用户筛选电影。但是假设Paul也是Facebook的用户，并且Paul在Facebook上有很多好友，它们也喜欢看优秀的电影。那么Paul是否可以考虑将豆瓣上的用户和Facebook上的用户连接起来，将自己在豆瓣上获得的推荐在转发给和自己观影品味相似的好友呢？  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;将Facebook和豆瓣整合在一起需要设计三方面的交流，1社交服务提供商（Facebook），2社交服务消费者（豆瓣），用户（既有faceBook账户，也有豆瓣账户）。但是豆瓣对FaceBook上的操作是受限的，需要经过用户的授权。  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;在正常情况下，豆瓣想要连接Facebook是比较麻烦的，因为整个的连接过程设计到对三方授权协议OAth的实现，但如果采用springSocail的话，就可以减少很多麻烦，springsocial对OAth进行了实现，并抽象出了整个流程中设计到的对象。springSocailyou一下几个特点：  

springSocial会处理OAth协议，并处理与service provider的连接。
提供了一个Controller处理在web环境中，service provider，service consumer，与用户之间的数据交换。
Sigin  Controller允许用户登录service provider上的账户，对三方应用进行授权。  

|Name|Description|
|:---|:----------|
|spring-social-core|包含spring连接框架和OAth客户端支持|
|spring-social-config|springSocial配置支持|
|spring-social-sercurity|springSecurity的整合|
|spring-social-web|springweb的整合|


