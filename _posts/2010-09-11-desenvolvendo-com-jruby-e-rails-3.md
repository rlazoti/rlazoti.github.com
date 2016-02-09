---
language: pt-br
comments: true
date: 2010-09-11 14:28:55
layout: post
slug: desenvolvendo-com-jruby-e-rails-3
title: Desenvolvendo com JRuby e Rails 3
wordpress_id: 396
categories:
- Java
- JRuby
- MySQL
- Programação
- Ruby
- Ruby on Rails
tags:
- jee platform
- jruby
- Rails
- rails3
---

A versão final do [Rails 3](http://rubyonrails.org/) foi liberada faz pouco tempo e mesmo assim já tenho visto bastante material demonstrando as novidades dessa versão. Mas particularmente não vi muita coisa demonstrando como utilizar o [JRuby](http://jruby.org/) com essa nova versão do Rails e isso me motivou a escrever esse post.

Antes de começar efetivamente este post, irei recomendar a [leitura do post do Fábio Akita sobre RVM](http://akitaonrails.com/2010/01/01/limpando-meu-ambiente-de-desenvolvimento), nesse post ele mostra como instalar, configurar e utilizar o [RVM](http://rvm.beginrescueend.com/). Eu recomendo muito utilizar o RVM, pois ele facilita bastante o gerenciamento e utilização de várias versões do ruby, rails e gems.

Nesse post irei utilizar as seguintes tecnologias:

**
OS: Mac OS 10.6.4/Linux Ubuntu 10.04
RVM: 1.0.1
JRuby: 1.5.2
Rails: 3.0.0
MySQL Server: 5.1.45
**

_O exemplo completo do post pode ser visto no github:_ **[http://github.com/rlazoti/jruby-on-rails-3-example](http://github.com/rlazoti/jruby-on-rails-3-example)**

Agora voltando ao post, vou começar instalando a versão atual do JRuby disponível no RVM que é a **jruby-1.5.2**, para instalar esta versão basta executar o comando a seguir (depois de ter instalado o RVM):

{% highlight bash linenos %}
rvm install jruby
{% endhighlight %}

Agora vou definir o JRuby como a versão Ruby corrente no RVM através do comando:

{% highlight bash linenos %}
rvm use jruby
{% endhighlight %}

Feito isso já posso instalar as gems necessárias para desenvolver com o Rails 3, inicialmente vou instalar apenas o Rails, pois as outras gem serão definidas na própria aplicação e instaladas pelo [Bundler](http://gembundler.com/):

{% highlight bash linenos %}
gem install rails
{% endhighlight %}

Com o MySQL, RVM, JRuby e Rails instalados já tenho um ambiente pronto para iniciar o desenvolvimento da aplicação.

A aplicação será criada quase que da mesma forma que uma aplicação em rails 3, onde informarei o nome da aplicação, qual o banco de dados ela usará e um parâmetro adicional que define o template para criar a aplicação (repare que esse template serve para definir a base da aplicação como JRuby já baseado na versão 3 do framework Rails).

{% highlight bash linenos %}
rails new contacts -d mysql -m http://jruby.org/rails3.rb
{% endhighlight %}

Com o comando executado com sucesso, o passo seguinte é definir as gems que a aplicação precisa para ser executada, a definição das gem é feita no arquivo Gemfile.

{% highlight bash linenos %}
cd contacts
vi Gemfile
{% endhighlight %}

O conteúdo do arquivo Gemfile já com as gems necessárias para a aplicação é o seguinte:

{% highlight ruby linenos %}
source 'http://rubygems.org'

gem 'rails', '3.0.0'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

if defined?(JRUBY_VERSION)
  gem 'activerecord-jdbc-adapter'
  gem 'activerecord-jdbcmysql-adapter'
  gem 'jdbc-mysql'
  gem 'jruby-openssl'
  gem 'trinidad'
else
  gem 'mysql2'
end

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug'

# Bundle the extra gems:
# gem 'bj'
# gem 'nokogiri'
# gem 'sqlite3-ruby', :require => 'sqlite3'
# gem 'aws-s3', :require => 'aws/s3'

# Bundle gems for the local environment. Make sure to
# put test-only gems in this group so their generators
# and rake tasks are available in development mode:
# group :development, :test do
#   gem 'webrat'
# end
{% endhighlight %}

A gem [Trinidad](http://github.com/calavera/trinidad) serve para rodar a aplicação em uma versão embedded do Apache Tomcat, existe também a possibilidade de usar a gem [Warbler](http://github.com/nicksieger/warbler) que serve para empacotar a aplicação em um arquivo WAR para que posteriormente o deploy seja feito em um web container ou application server java. As outras gem são necessárias para conexão JDBC com o MySQL.

Repare também que o arquivo Gemfile utiliza a variável de ambiente **JRUBY_VERSION** mas essa variável não é definida pelo RVM, então para que esse arquivo funcione de forma correta é necessário definí-la.

O RVM configura uma variável de ambiente chamada **RUBY_VERSION**, com isso fica fácil definir a variável que preciso conforme o comando a seguir:

{% highlight bash linenos %}
JRUBY_VERSION=$RUBY_VERSION
{% endhighlight %}

Ok, as gems foram definidas na aplicação mas ainda não foram instaladas. Esta tarefa é feita pelo [Bundler](http://gembundler.com/) utilizando o comando:

{% highlight bash linenos %}
bundle install
{% endhighlight %}

O arquivo config/database.yml contém a configuração com o bando de dados MySQL, e por padrão é definido o usuario **root** e uma senha vazia. Caso você tenha um usuário ou senha diferente é precisa editar esse arquivo.

Embora o uso de scaffold não seja recomendado, irei utilizá-lo para encurtar o post.
O passo seguinte é criar o banco de dados, criar um scaffold para contact e gerar a tabela no MySQL conforme comandos abaixo:

{% highlight bash linenos %}
rake db:create
rails g scaffold contact name:string email:string birthdate:date bio:text
rake db:migrate
{% endhighlight %}

Pronto! :D
A aplicação já pode ser executada e para isso vou usar a gem Trinidad e subir um Tomcat já com a aplicação inclusa.

{% highlight bash linenos %}
trinidad
{% endhighlight %}

Para acessar a aplicação basta abrir a url **http://localhost:3000/contacts** no browser.

Com isso finalizo esse post que demonstra como utilizar JRuby com Rails 3. ;)