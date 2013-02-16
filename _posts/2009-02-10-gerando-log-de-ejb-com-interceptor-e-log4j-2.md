---
comments: true
date: 2009-02-10 22:25:30
layout: post
slug: gerando-log-de-ejb-com-interceptor-e-log4j-2
title: Gerando Log de EJB com Interceptor e Log4J
wordpress_id: 133
categories:
- Artigos
- EJB
- Java
- Log4J
- Programação
tags:
- EJB
- Interceptors
- Log4J
- Session Bean
---

Uma forma simples de gerar log de uma aplicação é utilizando bibliotecas como [Log4J](http://logging.apache.org/log4j/) ou [Commons Logging](http://commons.apache.org/logging/), mas ficar incluindo em todas as classes necessárias, chamadas a métodos para gerar log pode ser uma tarefa muito repetitiva.

O [Spring framework](http://www.springsource.org/) resolve esse problema utilizando AOP (programação orientada a aspectos), onde podemos criar uma classe que inspeciona e gera os logs de chamadas a métodos de outras classes, assim economizamos tempo e poupa-se código também.

Utilizando a [espeficicação EJB 3.0](http://java.sun.com/products/ejb/docs.html) podemos também nos beneficiar de um recurso parecido com o utilizando pelo Spring na qual chama-se Interceptors, com ele podemos interceptar chamadas aos métodos de negócio dos nossos Sessions Beans e Message Driven Beans.

Para demonstrar seu funcionamento, Vou criar um pequeno exemplo utilizando um Stateless Session Bean e um Interceptor utilizando Log4J, porém este post não visa explicar como configurar um projeto EJB e a ferramente Log4J, mas simplesmente demonstrar como utilizar Interceptors em uma simples aplicação que utiliza EJB.

Primeiro vou criar o Interceptor, o método intercept tem a finalidade de gerar o log de todas as classes que ele interceptar, o método é definico com a anotação @AroundInvoke, este método pode se encontrar em uma classe separada (como no exemplo a seguir) ou no próprio session bean, lembrando apenas que só pode ter um único método anotado por classe, mas nada impede de termos várias classes de interceptors.

{% highlight java linenos %}
package br.com.rodrigolazoti;

import javax.interceptor.AroundInvoke;
import javax.interceptor.InvocationContext;

import org.apache.log4j.Logger;

public class LoggerInterceptor {

@AroundInvoke
public Object intercept( InvocationContext invocationContext ) throws Exception {
Logger log = Logger.getLogger( "myProject" );
String methodName = invocationContext.getMethod().getName();
String className = invocationContext.getTarget().getClass().getName();

log.debug( "Calling Method: " + className + "." + methodName );
long timeBefore = System.currentTimeMillis();

try {
return invocationContext.proceed();
}
catch ( Exception e ) {
log.error( "Error on calling method " + className + "." + methodName );
log.error( "Root cause: ", e );
throw e;
}
finally {
long timeAfter = System.currentTimeMillis();
log.info( "Method " + className + "." + methodName + " called in " +
( timeAfter - timeBefore ) + "ms" );
}
}
}
{% endhighlight %}

Agora vou criar o interface remota do meu session bean:
{% highlight java linenos %}
package br.com.rodrigolazoti;

import javax.ejb.Remote;

@Remote
public interface MyServiceBean {
Integer sum( Integer[] values );

String createWelcomeMessage( String name );
}
{% endhighlight %}

Finalmente a implementação do session bean, repare que utilizo a anotação @Interceptors, onde posso definir um ou mais interceptors para esta classe, podemos também definir um interceptor para um método ou até mesmo excluir um interceptor de um método ou classe utilizando a anotação @ExcludeClassInterceptors. Utilizando a configuração via XML podemos definir um interceptor para um grupo de ejb's por exemplo.

<!-- more -->

{% highlight java linenos %}
package br.com.rodrigolazoti;

import javax.ejb.Stateless;

import javax.interceptor.Interceptors;

@Stateless( name = "MyServiceBean" )
@Interceptors( { LoggerInterceptor.class } )
public class MyServiceBeanBean implements MyServiceBean {

public Integer sum( Integer[] values ) {
Integer result = 0;
for ( Integer value: values )
result += value;
return result;
}

public String createWelcomeMessage( String name ) {
StringBuilder message = new StringBuilder();
message.append( "Welcome " + name + "!" );
return message.toString();
}
}
{% endhighlight %}

Vou criar um arquivo chamado log4j.properties, para configurar o comportamento da saída dos logs gerados pelo Log4J:


log4j.category.myProject=DEBUG
log4j.appender.myProject=org.apache.log4j.ConsoleAppender



log4j.appender.myProject.layout=org.apache.log4j.PatternLayout
log4j.appender.myProject.layout.ConversionPattern=%d{HH:mm:ss} %-5p [%C{1}] %m%n






E para terminar o exemplo vou criar um client para testar meu EJB e assim verificar se os logs foram gerados:

{% highlight java linenos %}
package br.com.rodrigolazoti;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class MyServiceBeanClient {

public static void main( String[] args ) {
try {
final Context context = getInitialContext();
MyServiceBean myServiceBean = ( MyServiceBean ) context.lookup( "MyServiceBean" );
Integer[] numbers = { 4, 6, 334, 2, 3, 65, 2, 54, 23, 1 };

String message = myServiceBean.createWelcomeMessage( "Rodrigo Lazoti" );
Integer result = myServiceBean.sum( numbers );

System.out.println( message );
System.out.println( result );
}
catch ( Exception ex ) {
ex.printStackTrace();
}
}

private static Context getInitialContext() throws NamingException {
return new InitialContext();
}
}
{% endhighlight %}

Pronto, é so iniciar o Application Server (JBoss, OC4J, WebLogic e etc...), fazer o deploy da aplicação e executar o teste. Esta é a saída apresentada no console do application server:


10:46:17 DEBUG [LoggerInterceptor] Calling Method: br.com.rodrigolazoti.MyServiceBeanBean.createWelcomeMessage
10:46:17 INFO  [LoggerInterceptor] Method br.com.rodrigolazoti.MyServiceBeanBean.createWelcomeMessage called in 0ms
10:46:17 DEBUG [LoggerInterceptor] Calling Method: br.com.rodrigolazoti.MyServiceBeanBean.sum
10:46:17 INFO  [LoggerInterceptor] Method br.com.rodrigolazoti.MyServiceBeanBean.sum called in 0ms


Agora basta inserir a anotação @Interceptors( { LoggerInterceptor.class } ) em outros EJB's Sessions Beans para que o Interceptor gere log para as chamadas aos seus métodos.
