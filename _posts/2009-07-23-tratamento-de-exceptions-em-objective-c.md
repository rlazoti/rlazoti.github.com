---
language: pt-br
comments: true
date: 2009-07-23 09:54:28
layout: post
slug: tratamento-de-exceptions-em-objective-c
title: Tratamento de Exceptions em Objective-C
wordpress_id: 128
categories:
- Artigos
- Objective-C
- Programação
tags:
- Cocoa
- Exceptions
- iPhone SDK
- Objective-C
- OOP
- Programação
- SDK
- XCode
---

A linguagem Objective-C possui uma sintaxe para tratamento de exceptions parecido com Java e C++. As exceptions podem ser do tipo NSException, NSError ou podem ser classes customizadas que são subclasses de NSException.

O suporte a exception é feito pelas diretivas de compilação:  @try, @catch, @throw, e @finally. A seguir irei definir o signigicado de cada diretiva.

@try: inicia um bloco de tratamento de exception, dentro dele deve estar todo código que pode ou deve lançar alguma exception.

@catch: contém o tratamento de uma determinada exception lançada pelo código contido no bloco @try.

@throw: sua finalidade é lançar uma exception.

@finally: todo código contido neste bloco será executado independente de uma exception ser lançada ou não dentro do bloco @try.

A sintaxe comum para declar um bloco @try..@catch..@finally é:

{% highlight objective-c linenos %}
@try {
  //codigo aqui
}
@catch( NSException *exception ) {
  //tratamento da exception aqui  
}
@finally {
  //codigo sempre executado aqui  
}
{% endhighlight %}

Agora vou criar um pequeno exemplo para demostrar o bloco funcionando.
Irei criar uma instancia da classe NSObject e dentro do bloco @try irei invocar o método doNothing que não existe e com isso será lançada um NSException.

{% highlight objective-c linenos %}
NSLog( @"Creating the instance of NSObject" );
NSObject *object = [[NSObject alloc] init];

@try {
  NSLog( @"try block" );
  [object doNothing];
}
@catch( NSException *exception ) {
  NSLog( @"catch block" );
  NSLog(@"main: Caught %@: %@", [exception name], [exception  reason]);
}
@finally {
  NSLog(@"finally block");
}
{% endhighlight %}

O resultado desse exemplo é:

{% highlight console linenos %}
App3[1594:10b] Creating the instance of NSObject
App3[1594:10b] try block
App3[1594:10b] *** -[NSObject doNothing]: unrecognized selector sent to instance 0x105950
App3[1594:10b] catch block
App3[1594:10b] main: Caught NSInvalidArgumentException: *** -[NSObject doNothing]: unrecognized selector sent to instance 0x105950
App3[1594:10b] finally block
{% endhighlight %}

Podemos tratar diversas exception em um único bloco @try, utilizando vários blocos @catch um em seguida do outro. Lembrando que você deve tratar primeiro as exceptions mais específicas e depois as mais genéricas. Veja um exemplo abaixo:

{% highlight objective-c linenos %}
@try {
  //codigo aqui
}
@catch( MyCustomException *exception ) {
  //tratamento da exception aqui  
}
@catch( NSException *exception ) {
  //tratamento da exception aqui  
}
@finally {
  //codigo sempre executado aqui  
}
{% endhighlight %}

Agora vou demonstrar o uso da diretiva @throw que serve para lançar uma nova exception, seu uso é bem simples bastando apenas informar a instancia da exception que será lançada.

{% highlight objective-c linenos %}
@try {
  NSLog( @"try block" );
  NSException *exception = [NSException exceptionWithName:@"HotTeaException" reason:@"The tea is too hot"  userInfo:nil];
  @throw exception;
}
@catch( NSException *exception ) {
  NSLog(@"main: Caught %@: %@", [exception name], [exception  reason]);
}
{% endhighlight %}

No exemplo anterior repare que não utilizei a diretiva @finally apenas para demonstrar que seu uso não é obrigatorio. O resultado apresentado desse código é:

{% highlight console linenos %}
App3[1886:10b] try block
App3[1886:10b] main: Caught HotTeaException: The tea is too hot
{% endhighlight %}

Com isso já temos um bom conhecimento de como tratar exceptions em nosso código Objective-C.