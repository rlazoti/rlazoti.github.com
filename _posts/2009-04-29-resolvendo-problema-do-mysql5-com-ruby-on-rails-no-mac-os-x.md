---
language: pt-br
comments: true
date: 2009-04-29 23:28:49
layout: post
slug: resolvendo-problema-do-mysql5-com-ruby-on-rails-no-mac-os-x
title: Resolvendo problema do MySQL5 com Ruby on Rails no Mac OS X
wordpress_id: 222
categories:
- Banco de Dados
- Mac OS X
- MySQL
- Programação
- Ruby
- Ruby on Rails
- Sistema Operacional
tags:
- Mac OS X
- MySQL
- Rails
- Ruby
---

Estou fazendo alguns pequenos testes em Ruby on Rails utilizando sqlLite3 e até ai tudo ok.Foi quando resolvi utilizar o MySQL5 em um projeto que meus problemas começaram! :(

Primeiro criei um projeto:

{% highlight bash linenos %}
_rails algum_projeto --database=mysql_
{% endhighlight %}

Depois criei um model, um controller e executei a migration, com isso recebi a mensagem indicando a falta de driver para o MySQL:

{% highlight console linenos %}
_The bundled mysql.rb driver has been removed from Rails 2.2. Please install the mysql gem and try again: gem install mysql._
{% endhighlight %}

Ok a mensagem é bem clara, então fui instalar o driver, e:

{% highlight bash linenos %}
_MacBook:projectTest rodrigo$ sudo gem install mysql
Building native extensions.  This could take a while...
ERROR:  Error installing mysql: ERROR: Failed to build gem native extension.
/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby extconf.rb install mysql
checking for mysql_query() in -lmysqlclient... nochecking for main() in -lm... yes
checking for mysql_query() in -lmysqlclient... nochecking for main() in -lz... yes
checking for mysql_query() in -lmysqlclient... nochecking for main() in -lsocket... no
checking for mysql_query() in -lmysqlclient... nochecking for main() in -lnsl... no
checking for mysql_query() in -lmysqlclient... no
Gem files will remain installed in /Library/Ruby/Gems/1.8/gems/mysql-2.7 for inspection.
Results logged to /Library/Ruby/Gems/1.8/gems/mysql-2.7/gem_make.out_
{% endhighlight %}

Ops, não deu certo! Pesquisando na internet, encontrei [algumas formas](http://albertoleal.eti.br/2008/12/como-instalar-rubygem-mysql-no-mac-os-x-leopard/) em que consegui instalar a extensão, porem ao iniciar o servidor e tentar acessar meu projeto o servidor retornava o seguinte erro:

{% highlight console linenos %}
_dyld: Symbol not found: _mysql_init
Referenced from: /Library/Ruby/Gems/1.8/gems/mysql-2.7/lib/mysql.bundle
Expected in: dynamic lookup_
{% endhighlight %}

Pesquisando mais um pouco, vi que o problema era o MySQL instalado no meu Mac, pois este era para a plataforma 64bits e o Rails so aceita a versão 32bits (Pelo menos no Mac OS X :( ) do MySQL.

Com isso, removi a instalação atual do MySQL assim:

{% highlight bash linenos %}
_sudo gem uninstall mysql
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/mysql*
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*

edit /etc/hostconfig and remove the line MYSQLCOM=-YES-

sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
{% endhighlight %}

Baixei e instalei a mesma versão do MySQL porem para 32bits e adicionei o driver novamente, com esse comando:

{% highlight bash linenos %}
sudo env ARCHFLAGS="-arch i386" gem install mysql -- --with-mysql-dir=/usr/local/mysql --with-mysql-lib=/usr/local/mysql/lib --with-mysql-include=/usr/local/mysql/include --with-mysql-config=/usr/local/mysql/bin/mysql_config_
{% endhighlight %}

Pronto, agora consegui criar um projeto Rails e fazer ele funcionar perfeitamente com o MySQL, então fica aí esta dica para quem passar por este problema. ;)