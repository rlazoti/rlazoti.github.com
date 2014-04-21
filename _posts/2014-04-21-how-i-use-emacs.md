---
comments: true
date: 2014-04-21 10:01:00
layout: post
slug: how-i-use-emacs
title: How I use Emacs
categories:
- emacs
- editor
tags:
- emacs
- editor
---

Getting started with an editor like Vi or Emacs isn't too easy in the beginning, so I'm going to show you what packages I'm currently using to write code in Javascript, Ruby and a little bit in Scala.

My emacs configuration is very simple and it was based on <a href="https://github.com/bbatsov/prelude" target="_blank">Emacs Prelude</a>. My setup can be found in my repo at <a href="https://github.com/rlazoti/emacs.d" target="_blank">https://github.com/rlazoti/emacs.d</a> and you also can see there a list with my useful shortcuts that I use constantly.

If you wish to install it, just type:

{% highlight bash linenos %}
git clone https://github.com/rlazoti/emacs.d.git ~/.emacs.d
{% endhighlight %}

#### Installation

There are many ways to install Emacs, you could install it from the sources or maybe using a package manager. I'm going to show the way that worked better for me. ;) Let's see it...

I installed on the Mac OS a 'mac port' of emacs 24. I did it with Homebrew but it's possible to download a version directly of <a href="https://github.com/railwaycat/emacs-mac-port/wiki/Downloads" target="_blank">here.</a> To install with Homebrew do:

{% highlight bash linenos %}
brew tap railwaycat/emacsmacport
{% endhighlight %}

And then

{% highlight bash linenos %}
brew install emacs-mac
{% endhighlight %}

That's it! It should be ready to use.

#### Repositories

Emacs 24 included a package manager called **package.el** and it already include a repository called **ELPA**, but it's possible to use multiple repositories. In fact I use just one more repository called <a href="http://melpa.milkbox.net/packages/" target="_blank">MELPA</a>.

#### Packages

These are the main packages I use:

* <a href="https://github.com/Wilfred/ag.el" target="_blank">ag.el</a>: It's a front-end to **ag**. Basically I use it to search for a term in all files of a project.
* <a href="https://github.com/auto-complete/auto-complete" target="_blank">autocomplete</a>: An auto-completion extension for Emacs.
* <a href="https://github.com/d11wtq/fiplr" target="_blank">fiplr</a>: It allows you to locate and open files deep within a complex directory tree, using fuzzy matching.
* <a href="http://flymake.sourceforge.net/" target="_blank">flymake</a>: An on-the-fly syntax checker for GNU Emacs.
* <a href="http://www.emacswiki.org/emacs/FlySpell" target="_blank">flyspell</a>: It enables on-the-fly spell checking in Emacs.
* <a href="http://www.emacswiki.org/emacs/highlight-current-line.el" target="_blank">highlight-current-line</a>: highlight line where the cursor is.
* <a href="https://github.com/nschum/highlight-symbol.el" target="_blank">highligh-symbol</a>: automatic and manual symbol highlighting for Emacs.
* <a href="http://www.emacswiki.org/emacs/InteractivelyDoThings" target="_blank">ido</a>: It lets you interactively do things with buffers and files.
* <a href="https://github.com/rejeep/drag-stuff.el" target="_blank">drag-stuff</a>: It makes it possible to drag stuff (words, region, lines) around in Emacs.
* <a href="https://github.com/aemoncannon/ensime" target="_blank">ensime</a>: Enhanced Scala Interaction Mode for Emacs.
* <a href="https://github.com/mooz/js2-mode" target="_blank">js2-mode</a>: JavaScript editing mode for Emacs.
* <a href="https://github.com/magnars/multiple-cursors.el" target="_blank">multiple-cursors</a>: A multi-line editing feature for Emacs.
* <a href="https://github.com/emacsmirror/rainbow-mode" target="_blank">rainbow-mode</a>: It adds color to your css/scss.
* <a href="https://github.com/rejeep/ruby-tools.el" target="_blank">ruby-tools</a>: Collection of handy functions for Emacs ruby-mode.
* <a href="https://github.com/hvesalai/scala-mode2" target="_blank">scala-mode2</a>: It's a scala major mode for emacs.
* <a href="https://github.com/Fuco1/smartparens" target="_blank">smartparens</a>: It automatically inserts closing parenthesis, tags, end’s and highlights them.
* <a href="http://www.emacswiki.org/emacs/SrSpeedbar" target="_blank">sr-speedbar</a>: It allows you to better navigate your sources. It very similar to NERDTree.
* <a href="http://web-mode.org/" target="_blank">web-mode</a>: It's a mode for editing web templates.
* <a href="http://www.emacswiki.org/cgi-bin/emacs/YARI" target="_blank">yari</a>: It provides an Emacs front-end to Ruby’s ‘ri’ documentation tool.
* <a href="https://github.com/capitaomorte/yasnippet" target="_blank">yasnippet</a>: It's a template system for Emacs. It allows you to type an abbreviation and automatically expand it into function templates.

