---
language: pt-br
comments: true
date: 2009-01-28 23:00:50
layout: post
slug: descobrindo-as-exceptions-encobertas-pelo-adf-faces
title: Descobrindo as exceptions encobertas pelo ADF Faces
wordpress_id: 99
categories:
- ADF
- IDE
- Java
- JDeveloper
- JSF
- Programação
tags:
- ADF
- Java
- JDeveloper
- JEE
- JSF
- Oracle
---

Atualmente estou desenvolvendo um sistema utilizando<a title="ADF Faces Home" href="http://www.oracle.com/technology/products/adf/adffaces/index.html" target="_blank"> ADF Faces</a> na IDE da <a title="Oracle JDeveloper Home" href="http://www.oracle.com/technology/products/jdev" target="_blank">Oracle JDeveloper</a> 10.1.3.4 e passei por um problema interessante. Estava ocorrendo um problema na minha aplicação mas não era gerado nenhuma exception no console, onde após determinada ação da aplicação era impresso no console apenas:

<span style="color: #ff0000;"><strong>15/01/2009 17:32:31 oracle.adf.controller.faces.lifecycle.FacesPageLifecycle addMessage
WARNING: JBO-29000: null
</strong></span>

Mensagem muito interessante e muito muito muito explicativa, não acham !?! :D

Depois de muito pesquisar, acabei encontrando uma forma de exibir o que ocasionou o <strong>JBO-29000</strong> e é bem simples de implementar, a idéia principal é sobrescrever o métdo <em>addMessage</em> da classe <em>FacesPageLifecycle e utilizá-la como o novo </em>ADFPhaseListener do projeto<em>.</em>

Primeiro vou extender a classe FacesPageLifecycle e sobrescrever o metodo addMessage para ter o novo comportamento (mostrar a exception):

{% highlight java linenos %}
package br.com.rodrigolazoti.view.adf;

import javax.faces.context.FacesContext;
import oracle.adf.controller.faces.lifecycle.FacesPageLifecycle;
import oracle.binding.AttributeBinding;

public class MyPageLifecycle extends FacesPageLifecycle {

  protected void addMessage(FacesContext context, AttributeBinding binding, Throwable error) {
    super.addMessage( context, binding, error );
    //aqui mostro o erro no console, log4j ou onde preferir
    error.printStackTrace();
  }

}
{% endhighlight %}

Agora eu extendo a classe ADFPhaseListener e retorno a minha classe criada acima ao invés de retorna a FacesPageLifecycle padrão do ADF:

{% highlight java linenos %}
package br.com.rodrigolazoti.view.adf;

import oracle.adf.controller.faces.lifecycle.ADFPhaseListener;

import oracle.adf.controller.v2.lifecycle.PageLifecycle;

public class MyPhaseListener extends ADFPhaseListener {
  
  protected PageLifecycle createPageLifecycle() {
    return new MyPageLifecycle();
  }
  
}
{% endhighlight %}

Agora basta subistituir o ADFPhaseListener original pelo criado acima no arquivo de configuração do JSF (<span style="font-style: italic;">faces-config.xml</span>):

{% highlight xml linenos %}
<lifecycle>
  <phase-listener>br.com.rodrigolazoti.view.adf.MyPhaseListener</phase-listener>
</lifecycle>
{% endhighlight %}

Com isso foi fácil descobrir o motivo da mensagem e o que estava acontecendo de errado na aplicação. ;)