---
comments: true
date: 2008-05-21 00:53:20
layout: post
slug: gerador-de-senhas-aleatorias-em-java
title: Gerador de senhas aleatórias em java
wordpress_id: 20
categories:
- Java
- Programação
---

Há algum tempo atrás eu precisei disponibilizar senhas diferenciadas para algumas pessoas, como achava uma perda de tempo ficar "bolando" senhas de forma manual, decidi desenvolver um software para gerar senhas aleatórias.

Seu uso é muito simples basta informar a quantidade de dígitos que a senha irá contem e caso queira uma chave para ser utilizada na geração da senha.

Para executá-lo basta executar o comando dentro da pasta _dist_ contida no arquivo zip:

{% highlight java linenos %}
java -jar RLPasswordGen.jar
{% endhighlight %}

<!-- more -->

![RLPasswordGen](/images/2007/RLPasswordGen.jpg)

Disponibilizei o os fontes do projeto assim como o projeto já compilado e empacotado em um arquivo .jar. O projeto foi feito no eclipse.

Para fazer o [download clique aqui.](http://www.rodrigolazoti.com.br/downloads/RLPasswordGen.zip)
