---
language: pt-br
comments: true
date: 2008-09-01 12:33:23
layout: post
slug: filtrando-usuarios-logados-em-jsf-com-phaselistener
title: Filtrando requisições em JSF com PhaseListener
wordpress_id: 56
categories:
- Java
- JSF
- Programação
---

Antigamente a forma mais comum para se criar uma forma de verificar a autorização das requisições feitas para determinado recurso de uma aplicação web era utilizando um filtro (Filter). Porém em Java Server Faces (JSF), podemos realizar esta tarefa de uma outra forma mais integrada, utilizando a interface _PhaseListener_.

Esta interface disponibiliza 3 métodos:

{% highlight java linenos %}
void afterPhase(PhaseEvent event);
void beforePhase(PhaseEvent event);
PhaseId getPhaseId();
{% endhighlight %}

No exemplo, irei demonstrar como utilizar o método _afterPhase_ que tem por finalidade fazer o tratamento de uma notificação assim que o processamento de uma determinada fase acabar de ser concluída.

A idéia principal do listener será verificar se existe um atributo de sessão chamado _"currentUser"_ que será uma instância de um objeto _User_ e este representará o usuário logado na aplicação. Caso este atributo exista, o listener deixa o ciclo da pagina seguir, mas caso o atributo não exista o ciclo será interrompido e redirecionado para a página de login.

Também terá uma verificação para não fazer nenhuma verificação caso a página atual da requisição seja a página de login.

Aqui temos o código do _PhaseListener_:

{% highlight java linenos %}
package com.rodrigolazoti.filter;

import javax.faces.application.NavigationHandler;
import javax.faces.context.FacesContext;
import javax.faces.event.PhaseEvent;
import javax.faces.event.PhaseId;
import javax.faces.event.PhaseListener;
import javax.servlet.http.HttpSession;

public class AuthorizationListener implements PhaseListener {

  public void afterPhase(PhaseEvent event) {

    FacesContext facesContext = event.getFacesContext();
    String currentPage = facesContext.getViewRoot().getViewId();

    boolean isLoginPage = (currentPage.lastIndexOf("login.jsf") > -1);
    HttpSession session = (HttpSession) facesContext.getExternalContext().getSession(true);
    Object currentUser = session.getAttribute("currentUser");

    if (!isLoginPage && currentUser == null) {
      NavigationHandler nh = facesContext.getApplication().getNavigationHandler();
      nh.handleNavigation(facesContext, null, "loginPage");
    }
  }

  public void beforePhase(PhaseEvent event) {
  }

  public PhaseId getPhaseId() {
    return PhaseId.RESTORE_VIEW;
  }

}
{% endhighlight %}

Note que o redirecionamento é feito por uma navegação configurada no arquivo _faces-config.xml_. Esta configuração é algo como:

{% highlight xml linenos %}
<navigation-rule>
  <from-view-id>/*</from-view-id>
  <navigation-case>
    <from-outcome>loginPage</from-outcome>
    <to-view-id>/login.xhtml</to-view-id>
  </navigation-case>
</navigation-rule>
{% endhighlight %}

Também deve-se incluir o listener no _faces-config.xml_:
{% highlight xml linenos %}
<lifecycle>
  <phase-listener>com.rodrigolazoti.filter.AuthorizationListener</phase-listener>
</lifecycle>
{% endhighlight %}

E com isso já se tem um _PhaseListener_ funcionando e filtrando as requisições da aplicação.