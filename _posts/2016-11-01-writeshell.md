---
layout: post
title: write shell
category: linux
---

# How to write shell script

写一个脚本需要下面几步:
(1)需要一个编译器写脚本.
(2)写好脚本之后需要给脚本可执行权限.
语法:
chmod permission your-script-name

例如:
chmod +x  your-script-name
chmod 755 your-script-name

释义: 上面的例子会给脚本拥有者读,写,执行权限,给同组和其他用户读和执行权限.

(3)执行脚本
语法:
bash your-script-name
sh your-script-name
./your-script-name

例如:
bash bar
sh bar
./bar

释义:在最后一种方法中"./"表示当前目录, .意味着给定的脚本文件在当前shell中不需要建立一个新的shell来执行脚本文件.
语法:
. file-name

例如:
. first

下面写一个简单的shell脚本.
{% highlight bash %}
#
# My first shell script
#
clear
echo "Knowlege is Power"
{% endhighlight %}
cript to print user information who currently login, current date & time
#
clear
echo "Hello $USER"
echo "Today is \c" ;date
echo "Number of user login : \c" ; who | wc -l
echo "Calendar"
cal
exit 0
./first
. first

通常情况下shell脚本文件都会加.sh扩展名,这样可以清楚的表明该文件是一个shell脚本文件.
复制,执行下面的脚本内容,观察一下输出.
{% highlight bash %}

{% endhighlight %}






























