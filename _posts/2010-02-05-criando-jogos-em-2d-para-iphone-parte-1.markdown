---
comments: true
date: 2010-02-05 21:43:47
layout: post
slug: criando-jogos-em-2d-para-iphone-parte-1
title: Criando jogos em 2D para iPhone - Parte 1
wordpress_id: 228
categories:
- Artigos
- Objective-C
- Programação
tags:
- 2d
- Cocoa
- cocos2d
- games
- IPhone
- iPhone SDK
- iPod Touch
- jogos
- Objective-C
- Programação
- SDK
- XCode
---

Sem dúvida o iPhone é uma ótima plataforma para criar jogos e não é por menos que a maioria dos aplicativos mais vendidos na app store são jogos. Os recursos como multi-touch, acelerômetro, GPS e etc contribuem para cada vez mais termos jogos mais criativos e divertidos.

Nesta primeira parte do artigo irei falar um pouco sobre o framework cocos2d e como utilizá-lo no XCode. Na segunda parte do artigo tentarei mostrar em um pequeno exemplo como explorar este framework para criar jogos em 2D para o iPhone SDK.

O cocos2d é um framework open source para desenvolvimento de jogos 2d baseado no OpenGL ES 1.1 e ele suporta gerenciamento de cenas, transição entre cenas, sprites, actions (comportamentos), menus e botões, renderização de textura, suporta a sons e muitas outras opções.

O primeiro passo é ter o XCode instalado no seu mac, para este tutorial estou utilizando a versao 3.2.1.

Continuando, seguirei para o [site do cocos2d](http://www.cocos2d-iphone.org/) e farei o [download](http://www.cocos2d-iphone.org/download) da versão 0.8.2 do framework. Apos o arquivo ser baixado vamos instalá-lo para utilizarmos ele dentro do XCode.

Começarei descompactando o arquivo, depois abra o Terminal.app e va ao diretório do framework descompactado, lá tera um arquivo chamado install_template.sh e este deve ser executado para instalar os templates do cocos2d no XCode. Então ainda no Terminal e na pasta citada anteriormente execute o arquivo da seguinte forma:

{% highlight xml linenos %}./install_template.sh{% endhighlight %}

Pronto, com isso o cocos2d já pode ser utilizado dentro do XCode. Abra o XCode e veja que agora existem templates disponíveis para criar aplicativos para iPhone SDK utilizando cocos2d.

[![cocos2d template](/images/2010/02/Screen-shot-2010-02-05-at-9.39.33-AM-300x243.png)](/images/2010/02/Screen-shot-2010-02-05-at-9.39.33-AM.png)

Agora crie uma cocos2d Application, esse template irá criar uma pequena aplicação de demonstração (hello world) do framework. Basta executá-la no simulador e ver o resultado.

[![Cocos2d Hello World](/images/2010/02/Screen-shot-2010-02-05-at-10.34.58-PM-300x158.png)](/images/2010/02/Screen-shot-2010-02-05-at-10.34.58-PM.png)

No próximo artigo iremos explorar alguns recursos do cocos2d e criar uma aplicação de exemplo.
Até o próximo artigo! :D
