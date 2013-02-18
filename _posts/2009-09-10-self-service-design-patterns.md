---
comments: true
date: 2009-09-10 17:35:36
layout: post
slug: self-service-design-patterns
title: Self-Service Design Patterns
wordpress_id: 272
categories:
- Design Patterns
- Java
- Livros
- Programação
tags:
- Design Patterns
- Dica
- Java
- Livro
- Programação
---

O título desse post realmente é estranho, mas calma, não estou criando um novo catálogo de padrões de projetos baseado na culinária brasileira. :D Na verdade é somente um desabafo para que nós (desenvolvedores de software) não utilizemos Design Patterns sem motivo em nossos projetos.

Depois de um bom tempo trabalhando com desenvolvimento de software e de ter passado por inúmeros projetos, vejo que muitas vezes as arquiteturas dos softwares desenvolvidos contém vários Design Patterns que nem sempre são necessários para o bom design do projeto, adicionando camadas (layers) desnecessárias ao projeto e tornando o desenvolvimento e manutenção mais trabalhosa e difícil.

Costumo ver muito arquiteturas do tipo  Action->Facade->Service->DAO,  que mais parece ser uma receita de bolo. Não que um software desenvolvido nessa arquitetura esteja errado ou certo, mas o meu principal questionamento é a real necessidade de ter implementado estes ou aqueles padrões de projetos.

Conforme descrição no Wikipedia:

> Design Patterns, descrevem soluções para problemas recorrentes no desenvolvimento de sistemas de software orientados a objetos. Um padrão de projeto estabelece um nome e define o problema, a solução, quando aplicar esta solução e suas conseqüências.

Na descrição acima vemos que os padrões de projetos existem para resolver certos problemas em uma arquitetura de software orientado a objetos e não para serem utilizados "á vontade" (self-service), mas infelizmente hoje vejo muitos desenvolvedores aplicando Design Patterns nos projetos apenas para poder dizer ( para outros ou para si mesmo ) que usa o Design Pattern XPTO no seu projeto e/ou que já possui experiência com Design Patterns. Com atitudes assim perde-se 2 vezes, uma no conhecimento pois o desenvolvedor está aprendendo de maneira errada a usar determinado padrão de projeto, e outra perde-se também na qualidade do software desenvolvido.

Um dos padrões que sofre com esse problema hoje é o Facade, pois sempre que vejo algo do tipo:

{% highlight java linenos %}
public class XptoFacade{

  private XptoService xptoService;

  public void insert( Xpto o ) {
    xptoService.insert( o );
  }

  public void update( Xpto o ) {
    xptoService.update( o );
  }

  public void delete( Xpto o ) {
    xptoService.delete( o );
  }

  public void update( Object o ) {
    xptoService.update( o );
  }

  public List<Xpto> list() {
    return xptoService.list();
  }

}
{% endhighlight %}

Me pergunto se este Facade realmente é nessário ja que ele serve apenas para replicar as chamadas de um único Service e sempre me lembro de uma parte do livro [Pojos in Action](/2008/10/14/livro-pojos-in-action), onde o autor fala um pouco sobre Exposed Domain Model, mostrando os prós e contras de um modelo de domínio exposto e de um que utiliza o padrão Facade.

Então para não prolongar muito o post deixo uma dica que considero muito importante:

Antes de aplicar um Design Pattern no seu projeto, se informe bastante sobre o padrão, veja se o problema que o padrão se propõe a resolver condiz com o problema que você espera solucionar ao aplicá-lo em seu projeto e lembre-se que uma boa arquitetura necessariamente não é aquela que aplica todos os padrões do [GoF](http://www.vincehuston.org/dp/) ou do [POEAA](http://martinfowler.com/eaaCatalog).
