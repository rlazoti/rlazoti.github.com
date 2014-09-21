---
comments: true
date: 2014-09-20 18:00:00
layout: post
slug: map-and-reduce-functions-in-javascript
title: Map and Reduce Functions in Javascript
categories:
- javascript
- functional programming
tags:
- javascript
- functional programming
---

Functions like **<a href="http://en.wikipedia.org/wiki/Map_(higher-order_function)" target="_blank">map</a>** and **<a href="http://en.wikipedia.org/wiki/Fold_(higher-order_function)" target="_blank">reduce</a>** are very useful, we can use them to extract values from lists.
Nowadays these functions are available in the most recent browsers, but have you ever thought about how to implement them?

So, that's the idea. Let's see how to do it in a functional way, in other words, let's do that using recursion and high order functions. As the post title suggest, the following example will be created in Javascript. :)

At first we're creating a function called **each**. We'll use it to iterate over a list, apply a function and then generate an accumulator. If done it correctly, we will be able to abstract out complex parts of our algorithm, replace it with a function call and keep code condensed and readable.

So let's see the function:

{% highlight javascript %}
var each = function(head, tail, acc, fn) {
  if (head != null) acc = fn(acc, head);
  if (tail == null) return acc;

  var _head = tail.length > 0 ? tail[0] : null;
  var _tail = tail.length > 1 ? tail.slice(1, tail.length) : null;
  return each(_head, _tail, acc, fn);
};
{% endhighlight %}

Okay, now we can create our **map** function. Basically a **map** function is a function that applies a given function to each element of a list and then returning another list of results.

It's our **map** function:

{% highlight javascript %}
var map = function(list, transformFn) {
  return each(null, list, [], function(acc, head) {
    acc[acc.length] = transformFn(head);
    return acc;
  });
};
{% endhighlight %}

See, it's not a big deal. We use the **each function** to iterate over the list and replace each list value by the result of transform function.
So how can we use it? Let's transform (multiply each value by 2) a simple array of numbers.

{% highlight javascript %}
var array = [1, 2, 3, 4, 5];
var multiplyFn = function(n) {
  return n * 2;
};

console.log(map(array, multiplyFn));
//[2, 4, 6, 8, 10]
{% endhighlight %}

And now the last one function called **reduce**. Different from **map** function, this one returns only one value with an initial value predefined that is the result of a combine function executed recursively over each element of the list. See the following function:

{% highlight javascript %}
var reduce = function(list, initalValue, combineFn) {
  return each(null, list, initalValue, function(acc, head) {
    return combineFn(acc, head);
  });
};
{% endhighlight %}

As an usage example, let's think up a shopping cart with some items. We'll need to calculate the total order to show it up at the checkout page.

{% highlight javascript %}
var Item = function(_description, _price) {
  this.description = function() { return _description; };
  this.price = function() { return _price; };
};

var shoppingCart = [
  new Item("iPhone 6", 749.00),
  new Item("The Amazing Spider-Man Hero FX Glove", 14.24),
  new Item("Playstation 4", 399.00)
];

var sumFn = function(total, item) {
  return total + item.price();
};

console.log(reduce(shoppingCart, 0, sumFn));
//1162.24
{% endhighlight %}

As can be seen, functions like **map** and **reduce** are great to transform and/or combine lists, and **<a href="http://en.wikipedia.org/wiki/Functional_programming" target="_blank">functional programming</a>** is good to abstract out complex algorithms.
