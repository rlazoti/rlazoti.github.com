---
language: pt-br
comments: true
date: 2009-04-12 20:04:15
layout: post
slug: brincando-com-objective-c-no-mac
title: Brincando com Objective-C no Mac
wordpress_id: 180
categories:
- Mac OS X
- Objective-C
- Programação
tags:
- Cocoa
- IPhone
- Mac
- ObjC
- Objective-C
---

Faz um certo tempo que venho querendo desenvolver algo para o iPhone, mas ultimamente tenho estado meio ocupado por inúmeros motivos, agora felizmente ja me livrei de [algumas coisas](/2009/04/02/scbcd-5-test-status-pass/) que consumiam meu tempo e pude começar a brincar com a linguagem Objective-C que é utilizada para desenvolver aplicativos para o iphone, então abri o XCode e alguns pdf's sobre Objective-C e comecei a testar a linguagem.

Nesse post irei colocar um dos exemplos que fiz, procurei comentá-lo bastante (em inglês :D ) para facililar o entendimento do código.

Basicamente criei uma classe Pessoa com duas variaveis de instancia (nome e data de nascimento), um metodo estático (class method) e três métodos de classe. Criei uma representação UML utilizando tipos do Java para representar a classe, pois não achei como utilizar os tipos do ObjC no argoUML. :(

![class diagram people](/images/2009/04/classdiagrampeople.gif)

Não vou ficar explicando para que serve exatamente cada parte do código para nao alongar muito o post.

Todo o codigo pode ser colocado em um único arquivo (algumNome.m) ou em arquivos separados @Interface ( algumNome.h) @Implementation e metodo main (algumNome.m).

Com este pequeno exemplo já pode-se entender de uma forma simples como trabalhar com classes e suas instancias, Strings, Datas e algumas definições OO em Objective-C.

Finalmente vamos ver o exemplo, vou começar pela @Interface (É diferente de uma interface Java) que especifica o que a classe People irá conter:

{% highlight objective-c linenos %}
#import <Foundation/Foundation.h>

//Interface of the class People
@interface People : NSObject
{
 //defining the instance variables as private
 @private
 NSString *name;
 NSDate *birthDate;
}

//static method or class method
+ (void) doSomething;

//instance method
- (void) sayMyName;
- (void) sayMyAge;
- (int) calculateMyAge;

//properties (getters and setters)
@property (readwrite, copy) NSString *name;
@property (copy, readwrite) NSDate *birthDate;

@end
{% endhighlight %}

Agora vou mostrar como ficou a implementação da classe People (antes que alguém reclame o calculo da idade so esta sendo feito ate o nivel Mês, ou seja, nao esta utilizando o dia do aniversario, apenas ano e mes para calcular a idade):

{% highlight objective-c linenos %}
//Implementation of the class People
@implementation People

/*
 tell the compiler that it should synthesize
 the setter and/or getter methods for the property
*/
@synthesize name;
@synthesize birthDate;

//implementation of the method class
+ (void) doSomething {
 printf("Do something!n");
}

//implementation  of the instance method class
- (void) sayMyName {
 printf("Hi, my name is %sn", [name UTF8String] );
}

//implementation of the instance method class
- (void) sayMyAge {
 NSString *myBirthDay = [birthDate descriptionWithCalendarFormat:@"%d/%m/%Y" timeZone:nil locale:nil];
 printf("Hi, my birth day is %s ", [myBirthDay UTF8String]);
 printf("and i have %i years", [self calculateMyAge]);
}

//implementation of the instance method class
- (int) calculateMyAge {
 NSDate *currentDate = [NSDate date];
 int birthYear = [[birthDate descriptionWithCalendarFormat:@"%Y" timeZone:nil locale: nil] intValue];
 int birthMonth = [[birthDate descriptionWithCalendarFormat:@"%m" timeZone:nil locale:nil] intValue];
 int currentYear = [[currentDate descriptionWithCalendarFormat:@"%Y" timeZone:nil locale:nil] intValue];
 int currentMonth = [[currentDate descriptionWithCalendarFormat:@"%m" timeZone:nil locale:nil] intValue];
 int age = currentYear - birthYear;
 if (currentMonth <= birthMonth) {
 age--;
 }
 return age;
}

@end
{% endhighlight %}

Pronto, já temos a classe pronta! Agora vou testá-la:

{% highlight objective-c linenos %}
int main (int argc, const char * argv[]) {
 //call class method
 [People doSomething];

 //create a instance of People
 People *rodrigo = [[ People alloc] init];

 //set the name
 [rodrigo setName: @"Rodrigo Lazoti"];

 //set the day of birth. Format: month/day/year
 [rodrigo setBirthDate: [NSDate dateWithNaturalLanguageString:@"08/08/1981"]];

 //call instance method
 [rodrigo sayMyName];

 //call instance method
 [rodrigo sayMyAge];

 //end program
 return 0;
}
{% endhighlight %}

O resultado do código executado será:

{% highlight console linenos %}

Do something!

Hi, my name is Rodrigo Lazoti.

Hi, my birth day is 08/08/1981
and i have 27 years

{% endhighlight %} 