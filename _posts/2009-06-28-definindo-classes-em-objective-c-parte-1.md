---
comments: true
date: 2009-06-28 16:17:36
layout: post
slug: definindo-classes-em-objective-c-parte-1
title: Definindo classes em Objective-C - Parte 1
wordpress_id: 42
categories:
- Artigos
- Objective-C
- Programação
tags:
- Classe
- Interface
- Mac
- Objective-C
- OOP
---

Assim como outras linguagens de programação, a linguagem Objective-C também suporta o o desenvolvimento utilizando orientação a objetos. Em Objective-C, as classes são definidas em duas partes:

  * Uma interface que declara os métodos, variáveis de instância da classe e sua superclasse.	
  * Uma implementação que realmente define a classe (contém o código que implementa os seus métodos).

Essas duas partes são geralmente divididas em dois arquivos, no entanto, uma definição de classe pode abranger vários arquivos através da utilização de um recurso chamado de "category" (Category serve para que uma classe já implementada possa receber novos métodos, algo parecido com subclasses).

**Arquivos**

Mesmo que o compilador não exija, a interface e a implementação são normalmente separados em dois arquivos diferentes. Um único arquivo pode declarar ou implementar mais de uma classe. No entanto, é recomendado um arquivo distinto para cada interface e outro para cada implementação.

Os arquivos de interface e implementação normalmente possuem o mesmo nome da classe. O nome do arquivo de implementação tem a extensão .m indicando que ele é um código fonte Objective-C. O arquivo da interface pode ser atribuído para qualquer outra extensão, contudo, geralmente utiliza-se a extensão .h (Indicando um Header ou Cabeçalho).

Por exemplo, a classe Person seria declarada no arquivo Person.h (Interface) e definida no Person.m (Implementation).

**Interface**

A declaração de uma interface inicia-se com a diretiva de compilação @interface e termina com a diretiva @end. (Todas as directivas de compilação em Objective-C começam com "@"). A seguir uma demonstração de como uma interface deve ser:

{% highlight objective-c linenos %}
@interface ClassName : ItsSuperclass
{
instance variable declarations
}

method declarations

@end
{% endhighlight %}

A primeira linha da declaração apresenta o nome da classe e a identificação de sua superclasse. Se uma classe nao informar uma superclasse então sera implicitamente utilizado a classe NSObject como superclasse.

Após a primeira linha de código da classe, um conjunto de chaves envolvem a declaração de variáveis da classe e em seguida vem a declaração de metodos que irão compor a classe. Os métodos podem ser definidos como métodos de classe e métodos de instancia. Métodos de classe são métodos que podem ser executam sem a necessidade de uma instância da classe, este tipo de método é definido pelo sinal '+'. Um exemplo de método de classe seria:

{% highlight objective-c linenos %}
+ doSomething;
{% endhighlight %}

Métodos de instancia, são metodos executados através das instancias de classes, este tipo de método é definido pelo sinal '-' e um exemplo de método de instancia seria:

{% highlight objective-c linenos %}
- (void) doSomething;
{% endhighlight %}

**Regras para Interface**

A finalidade do arquivo de interface é declarar a nova classe para outros arquivos fonte (e para outros programadores). Ela contém todas as informações que eles precisam para trabalhar com a classe (programadores poderão também apreciar um pouco de documentação).

A interface informa aos usuários como a classe está ligada na hierarquia de herança e o que ela herda.

A interface também permite que o compilador saiba que variáveis de instancia ela contém, diz também que variáveis foram herdadas. Apesar do exemplo de variáveis serem naturalmente mais vistos como uma questão da aplicação de uma classe e não na sua interface, eles devem ser declarados no arquivo de interface. Isto acontece porque o compilador precisa saber a estrutura de um objeto quando ele é utilizado, não apenas onde ele encontra-se definido.

Através de sua lista de método declarados, a interface permite que outros módulos saibam que mensagens podem ser enviadas para uma classe e instâncias da classe. Qualquer método que pode ser utilizado fora da definição da classe deve ser declarado na interface, métodos internos da classe de implementação podem ser omitidos.

Na próxima parte do artigo irei falar um pouco mais sobre declaração de variáveis de instância e de métodos, assim como do arquivo de implementação.
