---
language: pt-br
comments: true
date: 2008-07-10 17:59:57
layout: post
slug: dicas-para-struts-1x
title: Dicas para Struts 1.x
wordpress_id: 31
categories:
- Java
- Programação
- Struts
---

Como ainda vejo muitos desenvolvedores que utilizam de alguma forma o framework <a href="http://struts.apache.org/1.3.8/index.html" target="_blank">Struts 1.x</a> em projetos pessoais ou profissionais, ou desenvolvedores que estão aprendendo Java e optam por aprender Struts. Resolvi deixar algumas dicas quem podem ajudar o desenvolvimento de aplicações que utilizam este framework.

Essas dicas não são novas e muito menos revolucionárias, até porque este framework já cumpriu o seu papel e hoje em dia já existem inúmeros outros framework que funcionam ou melhor ou de forma equivalente ao Struts 1.x!

Iniciando as dicas:
<ol>
  <li>Vou começar indicando o uso de <a href="http://struts.apache.org/1.3.8/userGuide/building_controller.html#dyna_action_form_classes" target="_blank"><span class="postbody">DynaActionForm</span></a> em substituição ao ActionForm, imagine ter uma classe Java para cada formulário de seu projeto? Teríamos inúmeras classes java que podem ser substituídas por mapeamento XML do formulário no arquivo de configuração do struts, o struts-config.xml.Exemplo de um formulário configurado no struts-config.xml utilizando DynaActionForm:

{% highlight xml linenos %}
<form -bean name="UsuarioForm" type="org.apache.struts.action.DynaActionForm">
  <form -property name="Nome" type="java.lang.String"/>
  <form -property name="Login" type="java.lang.String"/>
  <form -property name="Senha" type="java.lang.String"/>
</form>
{% endhighlight %}
  </li>

  <li>Uma outra dica para economizar classes em java é ao invés de estender suas Actions da classe Action e assim ter uma classe para cada ação executada, estender da classe DispatchAction, assim pode-se utilizar mais de uma ação dentro de uma classe java.Classes Java estendendo de Action:
{% highlight java linenos %}
//arquivo  MinhaAction1.java
public class IncluirUsuario extends Action {

  public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,                          HttpServletResponse response) throws Exception {
    // conteudo da action
    return mapping.findForward("listaUsuario");
  }
}

//arquivo  MinhaAction2.java
public class AlterarUsuario extends Action {

  public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,                          HttpServletResponse response) throws Exception {
    // conteudo da action
    return mapping.findForward("listaUsuario");
  }
}
{% endhighlight %}

Agora uma classe Java estendendo de DispatchAction e contendo as mesmas duas ações:

{% highlight java linenos %}
public class Usuario extends DispatchAction {

  public ActionForward incluir(ActionMapping mapping, ActionForm form, HttpServletRequest request,                          HttpServletResponse response) throws Exception {
    // conteudo da action
    return mapping.findForward("listaUsuario");
}

  public ActionForward alterar(ActionMapping mapping, ActionForm form, HttpServletRequest request,                          HttpServletResponse response) throws Exception {
    // conteudo da action
    return mapping.findForward("listaUsuario");
  }
}
{% endhighlight %}
  </li>

  <li>Para colocar o foco em seu input quando o formulário carrega é bem simples basta fazer o seguinte:
{% highlight jsp linenos %}
<html :form action="UsuarioAcion" focus="Nome">
  <html :text property="Nome"/>
</html>
{% endhighlight %}
  </li>
  
  <li>Precisa limpar os dados de seu DynaActionForm ou DynaValidatorForm? Simples faça assim dentro de sua Action:
{% highlight java linenos %}
  DynaActionForm formulario = (DynaActionForm) form;
  formulario.getMap().clear();
{% endhighlight %}
</li>

  <li> Deixarei um alguns links interessantes de como utilizar a validação server-side do próprio Struts, como utilizar Tiles em conjunto com Struts para compor seu layout de páginas entre outras dicas. <a href="http://struts.apache.org/1.3.8/userGuide/building_view.html" target="_blank"> </a><a href="http://struts.apache.org/1.3.8/userGuide/building_view.html" target="_blank">Documentação do Struts.</a>
<a href="http://www.roseindia.net/struts/struts_validator_framework.shtml" target="_blank">Struts Validator Framework</a>.
<a href="http://www.roseindia.net/struts/struts_tiles.shtml" target="_blank">Developing Simple Struts Tiles Application</a>.</li>
</ol>