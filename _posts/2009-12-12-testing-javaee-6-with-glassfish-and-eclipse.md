---
comments: true
date: 2009-12-12 11:36:33
layout: post
slug: testing-javaee-6-with-glassfish-and-eclipse
title: Testing JavaEE 6 with Glassfish and Eclipse
wordpress_id: 41
categories:
- Application Server
- Java
- JavaEE 6
tags:
- Eclipse
- EJB
- glassfish
- Java
- javaee
- javaee6
- servlet
- stateful
- stateless
---

In this post, I'll show some news of the Java EE 6.
I'll use the following softwares:

[Glassfish v3](http://java.sun.com/javaee/downloads/index.jsp)
[ Eclipse Galileo JEE Edition](www.eclipse.org/)

After install them, we go create a dynamic web project in the Eclipse called FirstProjectJEE6:

Now, I'll replace the contents of the web.xml file for this:

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

To compile our project, we need to add a external jar (javaee.jar) to the project, the jar file is in the path **[glassfish_directory]/glassfish/lib/javaee.jar**

I'll create a ant script to make the deploy of our application in glassfish. It must be saved in the project root and should be called build.xml

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

Note that this path:
/Users/rodrigolazoti/Programs/glassfishv3/glassfish/domains/domain1/autodeploy
Should be replaced by the:
[your glassfish]/glassfish/domains/domain1/autodeploy

Now, we let's code a little, first we let's create two EJB using the new specification.
I'll create one stateless and one staleful EJB, the stateful ejb will serve only to represent the number of requests and the stateless will serve to return a message to the User.

The code of stateless ejb:

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

And the code of the stateful ejb:

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

Note that in both ejb, was not necessary to create a local or remote interface. :)

With our EJBs ready, we'll create a servlet to respond to http methods: GET and POST.

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

And finally, we'll create our jsp files. The index.jsp file will make the calls to the servlet and the hello.jsp file will show the result of calls.

The index.jsp file:

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

And the hello.jsp file:

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

Some news that I used this example:



	
  * Local business interfaces are optional in EJB 3.1.

	
  * In EJB 3.1, you can place enterprise bean classes in the .war file along with web tier components. You don't have to put EJB classes in the ejb-jar file.

	
  * Annotations can now be used in more types of Java EE components. And the set of annotations used for dependency injection has been standardized.

	
  * Instead of creating deployment descriptors, you can annotate classes to specify servlet-related deployment information.


This example is available at github: [http://github.com/rlazoti/tutorial-javaee6-first-project](http://github.com/rlazoti/tutorial-javaee6-first-project)
