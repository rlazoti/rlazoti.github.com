---
language: pt-br
comments: true
date: 2008-06-12 01:06:31
layout: post
slug: gerador-de-numeros-aleatorios-para-megasena-em-java
title: Gerador de números aleatórios para megasena em Java
wordpress_id: 27
categories:
- Java
- Programação
---

Algum tempo atrás resolvi criar um pequeno programa para gerar números aleatórios para jogos como a megasena, embora o programa esteja planejado para aceitar outros tipos de sorteios (jogos) eu só implementei a geração de números para Megasena.

Seu uso é simples, basta selecionar o tipo de loteria e clicar em sortear, também pode-se mudar o tipo de look and feel (tema).

![RL LoteriaGen](/images/2007/rlloteriagen.png)

Para executá-lo basta executar o comando:

{% highlight java linenos %}
java -jar RLLoteriaGen.jar
{% endhighlight %}

O projeto foi feito no [Eclipse](http://www.eclipse.org).

Disponibilizei o os fontes do projeto em um repositório no github.[ Clique aqui para acessar o repositório.](http://github.com/rlazoti/RLLoteriaGen)

Para fazer o [download do arquivo jar clique aqui.](/downloads/RLLoteriaGen.jar)