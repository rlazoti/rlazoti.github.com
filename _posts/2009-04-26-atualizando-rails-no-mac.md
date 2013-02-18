---
comments: true
date: 2009-04-26 00:47:45
layout: post
slug: atualizando-rails-no-mac
title: Atualizando Rails no Mac
wordpress_id: 209
categories:
- Mac OS X
- Ruby
- Ruby on Rails
tags:
- Leopard
- Mac
- OS X
- Rails
- Ruby
---

Desde que comecei a utilizar o [Mac OS X Lepard](http://www.apple.com/macosx/), utilizei muito pouco ruby e rails nele, pois tenho utilizado mais meu querido [Java](http://www.java.com/pt_BR/) e aprendido um pouco de [Objective-C.](http://pt.wikipedia.org/wiki/Objective-C)

Agora estou incluindo também no meu "_TODO List"_ de coisas a aprender, aprofundar meus conhecimentos tambem em [Ruby on Rails](http://rubyonrails.org/) e para minha alegria tudo que precisava para desenvolver em RoR já estava instalado no meu Mac (só precisei instalar o famoso [TextMate](http://macromates.com/)! :D ), porém o rails estava na versão 1.2.6.

Como eu tenho visto muito sobre as novidades da versão 2.x do rails, corri atrás de como atualizar o garoto e vi que é muito simples. A dica é abrir o terminar e digitar:

{% highlight bash linenos %}

$ sudo gem update --system
$ sudo gem install rails
$ sudo gem update rake
$ sudo gem update sqlite3-ruby

{% endhighlight %}

Pronto, simples assim! Com isso o rails foi atualizado para a versão 2.3.2, o rake para 0.8.4 e o sqlite para 3.4.0.

Agora é so abrir o textmate e começar a [cair na real](http://gettingreal.37signals.com/)! :D