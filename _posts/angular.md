---
title: angular
layout: post
category: angular
---
## What is Angular JS?
A client-side JavaScript Framework for adding interactivity to HTML
## Directives
A Directive is a marker on a HTML tag that tells Angular to run or reference some JavaScript code.
## MOdules
- Where we write pieces of our Angular application.
- Makes our code more maintainable, testable, and readable.
- Where we define dependencies for our app.
简单来说就是一个ng-app就是一个module,而且通常情况下,会把一个module写在一个js文件当中.
var app = angular.module('store', []);
## Expressions
Allow you to insert dynamic values into your HTML
Numerical Operations
<p>I am {{4 + 6}} </p>
String Operations
<p>{{"hello" + "you"}} </p>
## Working With Data
var gem = {
name: 'Dodecahedron',
price: 2.95,
description: '.....'
}
## Controllers
Controllers are where we define our apps behavior by defining functions and values.
(function(){
    var app = angular.module('store', []);
    app.controller('StoreController', function(){
});
})();
## Storing Data Inside the Controller
(function(){
    var app = angular.module('store', []);
    app.controller('StoreController', function(){
        this.product = gem;
    });
    var gem = {
        name: 'Dodecahedron',
        price: 2.95,
        description: '...'
    }

})();
## Directives We Know & Love
ng-app   attache the Application Module to the page
<html ng-app="store">
ng-controller
<body ng-controller="StoreController as store">
ng-show
<h1 ng-show="name">Hello, {{name}}!<h1>
ng-repeat repeat a section for each item in an Array
<li ng-repeat="product in store.products">{{product.name}}</li>
## Our Current Code
## Our First Filter
<em class="pull-right">{{product.price | currency}}</em>
## Adding an Image Array to our Product Array
var gems = [
    {
        name: 'Dodecahedron Gem',
        price: 2.95,
        description: '.....',
        images: [
           full: 'dodecahedron-01-full.jpa'
        ]
    }
]
## Using ng-src for Images
Using Arngular Expressions inside a src attribute causes an error!
,img ng-src="{{product.images[0].full}}"





























