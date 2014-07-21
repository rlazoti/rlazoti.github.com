---
comments: true
date: 2014-07-20 11:00:00
layout: post
slug: measuring-execution-time-in-javascript
title: Measuring Execution Time in JavaScript
categories:
- javascript
tags:
- javascript
---

Sometimes we need to know if our code is fast enough for a production environment, for example let's take a simple javascript function like that:

{% highlight javascript %}
var generateMessageA = function(name, username, email) {
  return "<h1>Hello " + name + "</h1>" +
         "<p>Thank you for your registration.</p>" +
         "<p>Your username is: " + username + "</p>" +
         "<p>Your email is: " + email + "</p>";
};
{% endhighlight %}

It's a very simple function, isn't it? :)

But you in an inspired day, decide to create a way to abstract the code above to something like a template method, thus you could use that at other functions. Let's see our new function:

{% highlight javascript %}
var interpolate = function(template, data) {
  var result = template;

  for (var property in data)
    result = result.replace(
      new RegExp('#{' + property + '}', 'g'),
      data[property]
	);

  return result;
};

var generateMessageB = function(name, username, email) {
  return interpolate(
           "<h1>Hello #{name}</h1>" +
           "<p>Thank you for your registration.</p>" +
		   "<p>Your username is: #{username}</p>" +
		   "<p>Your email is: #{email}</p>",
		   { name:name, username:username, email:email }
		 );
};
{% endhighlight %}

Now we have our cool template function, but let's wonder ourselves if we could have some performance issues adding that new function. What do you think about it?

Yeah, probably you're thinking about a way to measure our new function against the first one, and that's exactly what we're going to do. 

To do that, we can use these two functions **console.time()** and **console.timeEnd()** to measure the time taken by a function execution. The function **console.time()** takes a timer name, and **console.timeEnd()** must take the same timer name, then it'll report on the execution time since the timer started. Let's use them to measure our two functions:

{% highlight javascript %}
var iterations = 1000000;

console.time('generateMessageA');
for (var i=1; i<=iterations; i++)
  generateMessageA("Jon Snow", "jsnow", "jsnow@starkhouse.com");
console.timeEnd('generateMessageA');

console.time('generateMessageB');
for (var i=1; i<=iterations; i++)
  generateMessageB("Jon Snow", "jsnow", "jsnow@starkhouse.com");
console.timeEnd('generateMessageB');
{% endhighlight %}

And the output is:

{% highlight console %}
generateMessageA: 1285.380ms
generateMessageB: 8583.070ms
{% endhighlight %}

Wow, the second function is about 7 times slower than the first one, and it would probably be a problem in a real application.
