---
language: pt-br
comments: true
date: 2008-08-21 09:58:45
layout: post
slug: definindo-pacotes-em-javascript
title: Definindo pacotes em Javascript
wordpress_id: 54
categories:
- Javascript
- Programação
---

Já mostrei como utilizar javascript de uma forma mais OO (orientada a objetos) nestes dois posts:

  * [Orientação a objetos em Javascript - Herança](/2008/06/06/orientacao-a-objetos-em-javascript-heranca/)
  * [Orientação a objetos em Javascript](/2008/06/04/simulando-orientacao-a-objetos-em-javascript/)

Agora irei mostrar uma forma de separar o código javascript em pacotes de uma forma **parecida** com a feita pela framework [Yahoo! User Interface (YUI) Library](http://developer.yahoo.com/yui/), porém existem outras formas de se fazer isso como a feita pelo framework [Dojo](http://dojotoolkit.org/).

Exemplo utilizando YUI:

{% highlight javascript linenos %}
  YAHOO.example.calendar.cal1 = new YAHOO.widget.Calendar("cal1", "cal1Container");
{% endhighlight %}

Exemplo utilizando Dojo:

{% highlight javascript linenos %}
  dojo.require("dijit._Calendar");
{% endhighlight %}

E agora irei criar um exemplo simples, criarei uma classe chamada _StringUtils_ que conterá um método _trim_ e esta classe ficará no pacote _br.com.rodrigolazoti.utils_.

{% highlight javascript linenos %}
var br = br ? br : {}
     br.com = br.com ? br.com : {}
     br.com.rodrigolazoti = br.com.rodrigolazoti ? br.com.rodrigolazoti : {}
     br.com.rodrigolazoti.utils = br.com.rodrigolazoti.utils ? br.com.rodrigolazoti.utils : {}

  br.com.rodrigolazoti.utils.StringUtils = function() {

    this.trim = function( value ) {
      if (value==null) return null;
      else return value.replace(/ /g, "");
    }

  }
{% endhighlight %}

Testando o código:

{% highlight javascript linenos %}
var stringUtils = new br.com.rodrigolazoti.utils.StringUtils();
alert( stringUtils.trim( " a b c d e f " ) );
{% endhighlight %} 
