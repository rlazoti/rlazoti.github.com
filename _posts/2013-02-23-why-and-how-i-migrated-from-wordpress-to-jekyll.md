---
comments: true
date: 2013-02-23 14:46:11
layout: post
slug: why-and-how-i-migrated-from-wordpress-to-jekyll
title: Why and how I migrated from Wordpress to Jekyll
categories:
- wordpress
- jekyll
- ruby
- github
tags:
- wordpress
- jekyll
- ruby
- github
---

Since I started writing this blog I've always used <a href="http://wordpress.org/" target="_blank">Wordpress</a> and it's great, but the need to update Wordpress and its plug ins (a lot of them) always annoyed me.

Even I don't have much more time to write here I always wanted to write again. After I decided to write back, I also decided to improve my blog, with a new theme and a better and fun way to write posts.

##My choice and why
I chose to migrate this blog from Wordpress to <a href="http://jekyllrb.org/" target="_blank">Jekyll</a>. But why Jekyll?

Unlike Wordpress, Jekyll isn't a full CMS, it's a lot simpler, I can have a static site that is a lot lighter than Wordpress and mainly I just wanted to learn a new tool.

More reasons why I choose Jekyll were:

* It's in Ruby :)
* It uses <a href="http://liquidmarkup.org" taget="_blank">liquid</a> for the templating
* I can use git for the versioning of both code and posts
* Posts can be written in Markdown (Goodbye TinyMCE editor)

##How moving into Jekyll
First thing I did was install the <a href="http://www.wordpress.org/extend/plugins/disqus-comment-system/" target="_blank">Disqus plug in</a> and migrate all comments into it, this allowed me to keep my comment history and use them easily into Jekyll.

Second I exported all my blog in a XML file and used <a href="https://github.com/thomasf/exitwp" target="_blank">Exitwp tool</a> to convert my wordpress blog to jekyll. I had only to modify the image url in all posts and change syntax highlighting tag used in wordpress for liquid tag (pygments).

Ultimately I had to look for a new theme, I found the <a href="https://github.com/holman/left" target="_blank">Left theme</a> for Jekyll develop by <a href="http://zachholman.com" target="_blank">Zach Holman</a> so I decided to use it as a base for my own new theme.

##Hosting on Github Pages
Well, hosting static content in <a href="http://pages.github.com" target="_blank">Github Pages</a> is a piece of cake and it's completely free.
I just had to create a new repository there and send (git push) my files to it. It's super easy! :)

I've used the pages below to understand how to use Jekyll with Github Pages and how to set up my own domain.

* <a href="https://help.github.com/articles/using-jekyll-with-pages" target="_blank">Using Jekyll with Pages</a>
* <a href="https://help.github.com/articles/setting-up-a-custom-domain-with-pages" target="_blank">Setting up a custom domain with Pages</a>