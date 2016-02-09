---
language: pt-br
comments: true
date: 2009-07-16 09:56:48
layout: post
slug: trabalhando-com-strings-em-objective-c
title: Trabalhando com Strings em Objective-C
wordpress_id: 121
categories:
- Artigos
- Objective-C
- Programação
tags:
- C
- Classe
- Cocoa
- iPhone SDK
- Mac
- Objective-C
- OOP
- OS3.0
- Programação
- SDK
- XCode
---

Diferente do C puro que para utilizarmos uma cadeia de caracteres temos que criar um array ( char[] ), em Object-C temos 2 classes que são utilizadas para representar Strings em código Objective-C, elas são:

**NSString e NSMutableString( subclasse de NSString ).**

Uma string imutável (NSString) é definida não sua criação e não pode mais ser alterada, enquanto uma string mutável (NSMutableString) pode ter seu conteúdo alterado após sua criação. Com base nessas informações, entendemos que devemos utilizar NSString quando uma string não precisar ser alterada depois de sua criação e caso contrário devemos utilizar a classe NSMutableString.

Podemos criar uma String de 2 formas, utilizando métodos das classes NSString e NSMutableString ou o construtor @.

{% highlight objective-c linenos %}
NSString *texto1 = @"Minha String";
NSString *texto2 = [NSString stringWithUTF8String :"Nova String"];
{% endhighlight %}

Para comparar strings, você pode utilizar o operador == ou o metodo isEqualToString, utilizando o operador == a comparação é feita utilizando os ponteiros das variáveis e utilizando o método isEqualToString a comparação é feita utilizando o conteúdo das duas strings.

{% highlight objective-c linenos %}
NSString *texto1 = @"Minha String";
NSMutableString *texto2 = [[NSMutableString alloc] initWithString:@"Minha "];
[texto2 appendString: @"String"];

[texto1 isEqualToString: texto2]; // retorna false
NSBool *resultado = (texto1 == texto2); //retorna true
{% endhighlight %}

A classe NSString fornece diversos métodos para ajudar o desenvolvedor, para conhece-los o ideal é ler a documentação da classe disponível na [Apple Developer Connection](http://developer.apple.com/index.html).

Vou incluir alguns exemplos abaixo para demostrar alguns recursos que a classe NSString fornece:

{% highlight objective-c linenos %}
NSString *texto1 = @"Mac";
NSString *texto2 = [texto1 stringByAppendingString:@" Developers"];
// texto2 tera o valor @"Mac Developers"
{% endhighlight %}

No exemplo acima criei uma instância de NSString chamada texto1 e depois criei outra instância chamada texto2 utilizando o valor da variavel texto1 e adicionando outro valor no final.

{% highlight objective-c linenos %}
NSString *numeros = @"0123456789";
NSString *parte = [numeros substringToIndex:4];
// parte é igual a @"0123"
{% endhighlight %}

No exemplo acima criei uma instância de NSString chamada numeros com o valor "0123456789" e depois criei uma segunda instância de NSString chamada parte onde seu valor sera os 4 primeiros caracteres da variavel numeros.

Com isso já sabemos o básico de como utilizar as classes NSString e NSMutableString em Objective-C.