---
title: StringBuilder
category: java
layout: post
---

## StringBuilder
java5中添加的语言特性--泛型,枚举,注解,自动装箱和增强的for循环--不需要修改JVM的指令集,几乎全部都是在静态编译器(javac)和类库中实现的.当编译器遇到使用泛型的情况时,会试图检查是否保证了类型安全(如果不能检查,会报"unchecked cast"),然后发出字节码,生成的字节码与等价和非泛型代码--类型强制转换的代码相同.
StringBuilder和String非常类似,但是StringBuilder是一个变量.总的来说就是一个可变长度的字符串数组.在任何时刻都可以调用相应的方法改变字符序列的长度和内容.
String常常被使用,但StringBuilder在简洁和性能上要比String更加优秀.例如,如果需要拼接大量的字符串,使用StringBuilder则更加高效.
### Length and Capacity
StringBuilder和String类似都有一个用于获取长度的函数method(),但不同的是StringBuilder有capacity()函数用于获取允许的字符长度.并且会自增.


## Joiner
用分隔符把字符串连接起来可能会遇到不必要的麻烦.如果字符串中含有null,那连接操作会更加困难.Fluent风格的Joiner让连接字符串更加简单.
{% highlight java %}
Joiner joiner = Joiner.on("; ").skipNulls();
return joiner.join("Harry", null, "Ron", "Hermione");
{% endhighlight  %} 














## for-each 循环
增强的for循环有时叫做for-each循环,编译器编译它的时候,会转化为等价的旧式代码:
{% highlight java %}
Collection<Foo> fooCollection = ...
for (Foo foo : fooCollection) {
    doSomething(foo);
}
{% endhighlight %}
等价代码:
{% highlight java %}
for (Iterator<Foo> iter = f.iterator(); f.hasNext();){
    Foo foo = iter.next();
    doSomething(f);
}
{% endhighlight %}
编译器如何知道提供的参数又一个iterator()方法呢?javac编译器的设计者可能已经内置了对集合框架的理解,但是这种方法有些不必要的限制.所以,创建一个新的接口java.lang.Iterable,并翻新集合类使其实现Iterable接口.这样,不是在核心集合框架上构建的容器类也能利用新的for-each循环.但是这样会对java5进行依赖.
{% highlight java %}
public interface Iterable<T> {
    Iterator<T> iterator();
}
{% endhighlight %}
































