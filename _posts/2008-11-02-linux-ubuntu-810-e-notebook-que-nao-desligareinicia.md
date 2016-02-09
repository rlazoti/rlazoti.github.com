---
language: pt-br
comments: true
date: 2008-11-02 23:37:36
layout: post
slug: linux-ubuntu-810-e-notebook-que-nao-desligareinicia
title: Linux Ubuntu 8.10 e notebook que não desliga/reinicia
wordpress_id: 95
categories:
- Linux
- Sistema Operacional
tags:
- Linux
- Sistema Operacional
- Ubuntu
---

Esse final de semana aproveitei para instalar a nova versão 8.10 do Ubuntu no meu notebook, eu já utilizava a versão 8.04 e estava muito satisfeito com ela, mas minha curiosidade foi maior e acabei não resistindo e instalando a nova versão.

Como não tive boas esperiências com atualização do S.O., resolvi fazer um backup dos meus arquivos e fazer uma instalação "do zero" no meu notebook. A Instalação ocorreu tranquilamente via interface gráfica e todo meu hardware foi detectado corretamente.

Ainda não tive muito tempo para avaliar todas as novidades e como esta versão está se comportando, mas por enquanto não tive grandes problemas.

Mas como nem tudo são flores uma coisa que me deixou um pouco preocupado foi que meu note demorava cerca de 7 minutos para desligar ou para reiniciar, contudo após algumas pesquisas acabei encontrando uma solução para este problema, na qual descrevo a seguir:

Edite o arquivo /etc/init.d/alsa-utils

{% highlight console linenos %}
sudo gedit /etc/init.d/alsa-utils
{% endhighlight %}

Após o texto "stop)" no arquivo (aproximadamente na linha 353), adicione:

{% highlight console linenos %}
ifconfig wlan0 down
ifconfig eth0 down
{% endhighlight %}

Então o arquivo deve ficar assim:

{% highlight console linenos %}
stop)
ifconfig wlan0 down
ifconfig eth0 down
EXITSTATUS=0
{% endhighlight %}

Com isso o problema foi resolvido e agora meu Ubuntu desliga e reinicia normalmente. :D