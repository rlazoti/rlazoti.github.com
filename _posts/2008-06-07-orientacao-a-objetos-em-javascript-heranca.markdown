---
comments: true
date: 2008-06-07 00:01:48
layout: post
slug: orientacao-a-objetos-em-javascript-heranca
title: Orientação a objetos em Javascript - Herança
wordpress_id: 25
categories:
- Javascript
- Programação
---

Neste segundo post sobre orientação a objetos com Javascript irei demonstrar como utilizar o conceito de herança.

Para se fazer uso de herança em javascript deve-se utilizar a propriedade prototype, os objetos em javascript contém uma propriedade "especial" chamada prototype que permite que seja adicionado métodos e propriedades as classes.

Quando se define um valor para a propriedade prototype, no momento em que se cria uma instância de uma classe em javascript, as propriedades prototypes são acopladas a classe.

O exemplo ira se basear em uma classe chama Pessoa com um atributo nome, seu método get e set e uma classe Amigo com um atributo telefone que irá herdar os atributos e métodos da classe Pessoa.

Primeiro o javascript para a classe Pessoa:

{% highlight javascript linenos %}

{% endhighlight %}

Agora o javascript para a classe Amigo:
<!-- more -->
{% highlight javascript linenos %}

{% endhighlight %}

E finalmente o exemplo de como aplicar herança em javascript:

{% highlight javascript linenos %}

{% endhighlight %} 
