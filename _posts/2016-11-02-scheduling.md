---
category: spring
title: scheduling
layout: post
---

# Task Execution and Scheduling

## Introduction
The Spring Framework provides abstractions for asynchronous execution and scheduling of tasks with the TaskExecutor and TaskScheduler interfaces, respecitively. Spring also features implementations of those interfaces that support thread pools or delegation to CommonJ within an application server environment.

## The Spring TaskScheduler abstraction
In additon to the TaskExecutor abstraction, Spring 3.0 introduces a TaskScheduler with a variety of methods for scheduling tasks to run at some point in the future.
{% highlight java %}
public interface TaskScheduler {
ScheduledFuture schedule(Runnable task, Trigger trigger);
ScheduledFuture schedule(Runnable task, Date startTime);
ScheduledFuture scheduleAtFixedRate(Runnable task, Date startTime, long period); ScheduledFuture scheduleAtFixedRate(Runnable task, long period);
ScheduledFuture scheduleWithFixedDelay(Runnable task, Date startTime, long delay); ScheduledFuture scheduleWithFixedDelay(Runnable task, long delay);
}
{% endhighlight %}
The simplest method is the one named 'schedule' that takes a Runnable and Date only. That will cause the task to run once after specified time. All of the other methods are capable of scheduling tasks to run repeatedly. The fixed-rate and fixed-delay methods are for simple, periodic execution, but the method that accepts a Trigger is much more flexible.

### TaskScheduler implementations
As with Spring's TaskExecutor abstraction, the primary benefit of the TaskScheduler is that code relying on scheduling behavior nedd not be coupled a particular scheduler implementation.The flexibility this provides is particularly relevant when within Application Server environments where threads should not be created directly by the application itself.

A simpler alternative, the ThreadPoolTaskScheduler, can be used whenever external thread management is not a requirement.





































