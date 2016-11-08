---
title: bash
category: linux
layout: post

---
# Intorudction
Making decision is important part in ONCE life as well as in computers logical driven program. In fact logic is not LOGIC until you use decision making.This chapter introduces to the bashs structured language constricts such as:
- Decision making
- Loops

Is there any difference making decision in Real life and with Computers? Well real life decision are quite commplicated to all of us and computers even don't have that much power to understand our real life decisions. What computer know is 0(zero) and 1 that is Yes or No. To make this idea clear, lets play some game(WOW!) with bc - Linux calculator program.

`bc` After this command bc is started and waiting for your commands, i.e. give it some calculation as fllows 5 + 2 as:
5 + 2

# if condition
if condition which is used for decision making in shell script, If given condition is true then command1 is executed.
Syntax:
{% highlight bash %}
if condition
then 
        command1 if codition is true or if exit status of condition is 0(zero)
fi
{% endhighlight %}

Condition is defined as:
"Condition is nothing but comparison between two values."

For compression you can use test or [expr] statements or even exist status can be also used.

Expression is defined as:
"An expression is nothing but combination of values, relational operator(such as >, <, <> etc)and mathematical operators(such as +, -, / etc)."

Following are all examples of expression:
5>2
3+6
3*5
a<b
c>5
c>5+30-1

Type folowing commands(assumes you have file called foo)
cat foo
echo $?
The cat command return zero(0)i.e. exit status, on successful, this can be used, in if condition as follows, Write shell script as
{% highlight bash%}
#~/bin/sh
#
#script to print file
#
if cat $1
then
echo -e "\n\nFile $1, found and successfully echoed"
fi
{% endhighlight %}

Run above script as:
chmod 755 showfile
./showfile foo
Shell script name is showfile($0) and foo is argument(which is $1). Then shell compare it as follows:

# test command or [expr]
test command or [expr] is used to see if an expression is true, and if it is true it return zero(0), otherwise returns nonzero for false.
Syntax:
test expression OR [expression]

Example:
Following script determine whether given argument number is positive.

Detailed explanation
The line, if test $1 -gt 0, test to see if first command line argument($1) is greater than 0. If it is true(0) then test will return 0 and
 output will printed as 5 number is positive but for -45 argument there is no output because our condition is not true(0)(-45 is not greater than 0) hence echo statement is skipped. And for last statement we have not supplied any argument hence error
































