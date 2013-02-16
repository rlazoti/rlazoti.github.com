---
comments: true
date: 2009-12-14 14:39:33
layout: post
slug: testando-javaee-6-com-glassfish-e-eclipse
title: Testando JavaEE 6 com Glassfish e Eclipse
wordpress_id: 367
categories:
- Eclipse
- EJB
- IDE
- Java
- Programação
tags:
- annotation
- Eclipse
- EJB
- EJB3
- glassfish
- Java
- javaee6
- JEE
- Programação
- servlet
---

Neste post, vou mostrar algumas novidades do Java EE 6.
Eu vou usar os seguintes softwares:

[Glassfish v3](http://java.sun.com/javaee/downloads/index.jsp)
[ Eclipse Galileo JEE Edition](www.eclipse.org/)

Depois de instalá-los, vou criar um Dynamic Web Project no Eclipse chamado de FirstProjectJEE6:

Agora vou substituir o conteúdo do arquivo web.xml por este abaixo:

{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://java.sun.com/xml/ns/javaee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
	version="3.0">
	<welcome-file-list>
		<welcome-file>index.html</welcome-file>
		<welcome-file>index.htm</welcome-file>
		<welcome-file>index.jsp</welcome-file>
	</welcome-file-list>
</web-app>
{% endhighlight %}

Para compilar nosso projeto, precisamos adicionar um jar externo chamado javaee.jar ao projeto (Build Path),  o arquivo jar pode ser encontrado em **[glassfish_directory]/glassfish/lib/javaee.jar**

Criei também um script ant para fazer o deploy da nossa aplicação diretamente no glassfish. Este script deve ser salvo na raiz do projeto, salvei ele com o nome de build.xml. A seguir segue seu conteúdo:

{% highlight xml linenos %}
<?xml version="1.0" encoding="UTF-8"?>
<project name="FirstProject JavaEE 6" basedir="." default="deploy">
	<property name="warfile" value="FirstProject" />
	<target name="create">
		<war destfile="${warfile}.war" webxml="WebContent/WEB-INF/web.xml" update="true">
			<classes dir="build/classes" />
			<fileset dir="WebContent">
				<exclude name="WEB-INF/web.xml" />
			</fileset>
		</war>
	</target>
	<target name="copy">
		<copy todir="/Users/rodrigolazoti/Programs/glassfishv3/glassfish/domains/domain1/autodeploy" overwrite="true">
			<fileset dir=".">
				<include name="*.war" />
			</fileset>
		</copy>
	</target>
	<target name="deploy">
		<antcall target="create" />
		<antcall target="copy" />
	</target>
</project>
{% endhighlight %}

Note que esse local:
/Users/rodrigolazoti/Programs/glassfishv3/glassfish/domains/domain1/autodeploy
Deve ser substituído por:
[your glassfish]/glassfish/domains/domain1/autodeploy

Agora, vamos codificar um pouco, primeiro vamos criar dois EJB's usando um pouco da nova especificação.
Vou criar um EJB Stateless e um EJB Staleful, o stateful servirá apenas para representar o número de requisições feitas e o stateless servirá para retornar alguma mensagem para o usuário.

Esse é o código do EJB Stateless:

{% highlight java linenos %}
package br.com.rodrigolazoti.firstproject.service;

import javax.ejb.Stateless;

@Stateless
public class MyStatelessSessionBean {

	public String createMessage( String username ) {
		String message = "Hello World, ";

		if ( username != null && !"".equals( username.trim() ) ) {
			message += username + "!";
		}
		else {
			message += "stranger!";
		}

		return message;
	}

}
{% endhighlight %}

E este é o código do EJB Stateful:

{% highlight java linenos %}
package br.com.rodrigolazoti.firstproject.service;

import javax.ejb.Stateful;

@Stateful
public class MyStatefulSessionBean {

	private int amountOfrequests = 0;

	public int getAmountOfrequests() {
		return ++amountOfrequests;
	}

}
{% endhighlight %}

Note que em ambos EJB's, não foi necessário criar interfaces locais ou remotas. :)

Com nossos  EJB's prontos, vamos criar um servlet para responder ao seguintes métodos http GET e POST.

{% highlight java linenos %}
package br.com.rodrigolazoti.firstproject.controller;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.rodrigolazoti.firstproject.service.MyStatefulSessionBean;
import br.com.rodrigolazoti.firstproject.service.MyStatelessSessionBean;

@WebServlet( name = "MyServlet", urlPatterns = { "/hello" } )
public class MyServlet extends HttpServlet {

	private static final long serialVersionUID = -2206981309178199835L;

	@EJB
	private MyStatefulSessionBean myStatefulSessionBean;

	@EJB
	private MyStatelessSessionBean myStatelessSessionBean;

	@Override
	protected void doGet( HttpServletRequest request, HttpServletResponse response )
			throws ServletException, IOException {
		String message = myStatelessSessionBean.createMessage( null );
		request.setAttribute( "message", message );

		int amountOfRequests = myStatefulSessionBean.getAmountOfrequests();
		request.setAttribute( "amountOfRequests", amountOfRequests );

		request.getRequestDispatcher( "/hello.jsp" ).forward( request, response );
	}

	@Override
	protected void doPost( HttpServletRequest request, HttpServletResponse response )
			throws ServletException, IOException {
		String username = request.getParameter( "username" );
		String message = myStatelessSessionBean.createMessage( username );
		request.setAttribute( "message", message );

		int amountOfRequests = myStatefulSessionBean.getAmountOfrequests();
		request.setAttribute( "amountOfRequests", amountOfRequests );

		request.getRequestDispatcher( "/hello.jsp" ).forward( request, response );
	}

}
{% endhighlight %}

E finalmente, vamos criar os arquivos jsp. O arquivo index.jsp servirá pra fazer as chamados ao servlet e o arquivo hello.jsp irá mostrar o resultado do servlet.

Conteúdo do arquivo index.jsp:

{% highlight html linenos %}
<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
  <meta name="author" content="Rodrigo Lazoti"/>
  <title>First Java EE 6 Example</title>
</head>
<body>
  <p><a href="hello">Execute Servlet (GET)</a></p>

  <hr width="100%" noshade="noshade"/>

  <form action="hello" method="post">
    <p>Name:<input type="text" name="username"/></p>
    <p><button type="submit">Execute Servlet (POST)</button></p>
  </form>
</body>
</html>
{% endhighlight %}

E o conteúdo do arquivo hello.jsp:

{% highlight html linenos %}
<?xml version="1.0" encoding="ISO-8859-1" ?>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
  <meta name="author" content="Rodrigo Lazoti"/>
  <title>First Java EE 6 Example</title>
</head>
<body>
  <h2>Result: ${requestScope.message}</h2><br/>
  <h3>This servlet was executed ${requestScope.amountOfRequests} time(s).</h3><br/>
  <hr width="100%" noshade="noshade"/>
  <h4><a href="index.jsp">Back to main page</a></h4>
</body>
</html>
{% endhighlight %}

Pronto, nosso exemplo já esta pronto e pode ser testado. Com vimos algumas novidades como:



	
  * Interface local e remota são opcionais no EJB 3.1.

	
  * No EJB 3.1, vôce pode empacotar seus EJB's em arquivos WAR junto com componentes da camada web. Você não precisa ter sua classes EJB definidas em um arquivo ejb-jar.

	
  * Agora as annotations podem ser usadas em mais tipos de componentes Java EE e o conjunto de anotações usados para injeção de dependência foi padronizada.

	
  * Ao invés de criar deployment descriptors, você pode anotar as classes para especificar que ela é um servlet.



Este exemplo criado está disponível no github: [http://github.com/rlazoti/tutorial-javaee6-first-project](http://github.com/rlazoti/tutorial-javaee6-first-project)
