---
title: angular-controller
layout: post
category: angular
---
{% highlight javascript %}
angular.module('myApp', [])
.controller('myCtrl', function($scope, $http){
  $http.get("#")
    .then(function(response){
               $scope.myWelcome = response.data;
           }
     );
});
{% endhighlight %}
