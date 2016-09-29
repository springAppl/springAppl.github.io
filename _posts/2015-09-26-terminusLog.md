---

layout: post
category: terminus
title: log规范

---

## overview  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;日志在开发中非常重要的东西,但是大部分不合格的开发人员往往会忽略日志的重要性,在开发时想怎么写日志就怎么写日志,更有甚者都不写日志(本人就是这样).今天谈谈我在公司时关于日志的一些规范(主要是web方面,采用java开发).我会采用web开发时分层的思想,一层一层介绍我在公司的日志规范.  

## Service层  

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;在service层如果没有涉及到业务逻辑,只是单纯的把DAO的返回的东西在返回给controller层的话,一般是这样:  

#### 读操作
{% highlight java %}
public Response<User> findById(Long id){
    try{
	    return Response.ok(userDao.findById(id));
	} catche (Exception e){
	    log.error("find user failed, id={}, cause:{}", id, Throwables.getStackTraceAsString(e));
	    return Response.fail("operator.user.find.fail");
	}
}
{% endhighlight %}  

#### 写操作  

{% highlight java %}
public Response<Boolean> updateUser(User user){
    try{
	    return Response.ok(userDao.update(user));
	} catch (Exception e){
	    log.error("update user failed, user={}, cause:{}", user, Throwables.getStackTraceAsString(e));
		return Response.fail("operator.role.update.fail");
	}
}
{% endhighlight  %}  

Throwables来自guava包.

> google将自己用java开发时常用到的java类整理了出来,然后就形成了guava包.  使用Throwables中getStackTraceAsString的好处是,写日志时在也不用像jdbc的黑暗时代一样拼接字符串了.


## controller层   

&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;对于controller层,会涉及到业务逻辑的处理,因此在这里会经常处理日志.但是在这里处理日志需要区分一下,除了error级别外,可能会又其他级别,比如warn.一般情况下只有warn和error,其他级别是不会出现的.但是我本人也有疑惑,什么时候用error,什么时候用warn,我看了一下,但是没有找到规律,可见大家都有各自的习惯.我自己思考了一下,既然大家都有各自的习惯,那就按照error来吧,这样在寻找异常的时候至少不会丢失.  

#### 读操作  

{% highlight java %}
@RequestMapping( value = "/{id}",method = RequestMethod.GET)
public User findById(@RequestParam("id") Long id){
    Response<User> userResp = userReadService.findById(id);
	if(!userResp.isSuccess()){
	    log.error("user find fail, id={}, error:{}", id, userResp.getError());
		throw new JsonException(userResp.getError());
	}
}
{% endhighlight %}  

#### 写操作  

{% highlight java %}
@RequestMapping(vallue = "/{id}",method = RequestMethod.PUT)
public Boolean update(@PathVariable Long id, @RequestBody User user){
    Response<User> userResp = userReadService.findById(id);
	if(!userResp.isSuccess()){
	    log.error("user update fail, id={}, user={}, error:{}", id, user, userResp.getError());
		throw new JsonException(userResp.getError());
	}
}
{% endhighlight %}