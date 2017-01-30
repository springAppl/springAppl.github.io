---
layout: _post
title: springsecurity
category: security
---
Spring Security provides comprehensive security services fo J2EE-based enterprise software applications. There is a particular emphasis on supporting projects build using  The Spring Framework, which is the leading J2EE solutiong for enterprise software development. If you're not using Spring for developing enterprise applications, we warmly encourage you to take a closer look at it. Some familiarity with spring  and in particulay dependency injection principles - will help you get upt to speed with Spring Security more easily.
Prople use Spring Security for many reasons, but most are draw to the project after finding the security feature of J2EE's 
Servlet Specification or EJB Specification lack the depth required for typical enterprise application scenarios.
Therefor, if you switch server environments, it is typically a lot of work to reconfigure your application's security in the new target environment. Using Spring Security overcomes these problems, and also brings you dozens of others useful, customisable security features.
As you probably know two major areas of application security are "authentication" and "authorizationg"(or "access-control").These are the two main areas that Spring Security targets. "Authentication" is the process of establishing a principal is who they claim to be (a "principal" generally means a user, device or some other system which can perform an action in your application)."Authorization" refers to the process of deciding whether a principal is allowed to perform an action within your To arrive at the point where an authorization decision is needed, the identity of the principal has already been established by the authentication process. These concepts are common, and not all specific to Spring Security.
At an authentication level, Spring Security supports a wide range of authentication models. Most of these authentication models are either provides by third parties, or are developed by relevant standards bodies such as the Internet Engineering Task Force. In addition, Spring Security provides its own set of authentication features. Specifically, Spring Secuity currently supports authentication integration with all of these technologies:
# Security Namespace Configuration
## 2.1 Introduction
Namespace configuration has been available since version 2.0 of the Spring framework. It allows you to supplement the traditional Spring beans application context syntax with elements from additonal XML schema. You can find more information in the Spring Refercnece Documentation. A namespace element can be used simply to allow a more concise way of configuring an individual bean or, more powerfully, to define an alternative configuration syntax which more closely matches the problem domain and hides the underlying complexity form the user. A simple element may conceal the fact that multiple beans and processing steps 
# Technical Overview
## 5.1 Runtime Environment
Spring Security 3.0 requires a Java 5.0 Runtime Environment or higher. As Spring Security aims to operate in a self-contained manner, there is no need to place any special configuration files into your Java Runtime Environment. In particular, there is no need to configure a
## 5.1 Hello Web Security JavaConfiguration
### 5.6.4 AuthenticationProvider
You can define custom authentication by exposing a custom AuthenticationProvider as a bean. For example, the following will
customize authentication authentication assuming that SpringAuthenticationProvider implements AuthenticationProvider:


Whait is Spring Security
- Compreshensive support for Authentication and Authorization
- Protection against common attacks
- Servlet API integration
- Optional integration with Spring MVC
- Portability

New in Spring Security 3.2
- Servlet 3 and Servlet 3.1 integration
- Concurrency Support
- Spring MVC integration
- CSRF protection
- Security header integration
- Java Configuration support












































