---
comments: true
date: 2011-05-30 12:06:11
layout: post
slug: how-to-install-htop-on-macos
title: How to install htop on MacOS
wordpress_id: 555
categories:
- Mac OS X
- operational system
- Sistema Operacional
- Terminal
tags:
- Apple
- htop
- Leopard
- Linux
- Mac
- Mac OS X
- os
- terminal
---

[htop](http://htop.sourceforge.net/) is a great interactive process viewer in text-mode, but unfortunately it works only on [Linux](http://wikipedia.org/wiki/Linux).
Fortunately I found in [Github](http://github.com) a htop version for [OSX](http://www.apple.com/br/macosx/) and it works perfectly.

To install it, before you'll need to have [git](http://git-scm.com/) (if you already don't have git installed :]).
So, below you can see how to install it.

{% highlight bash linenos %}
git clone git://github.com/AndyA/htop-osx.git
cd htop-osx
git checkout -b osx origin/osx
export CFLAGS="-m32"
./autogen.sh
./configure
make
sudo make install
{% endhighlight %}


To run it, just execute **htop** in your terminal. ;)

![](/images/2011/05/Screen-shot-2011-05-28-at-1.09.54-AM.png)