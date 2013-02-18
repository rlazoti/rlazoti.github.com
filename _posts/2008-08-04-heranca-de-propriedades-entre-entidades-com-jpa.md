---
comments: true
date: 2008-08-04 01:28:52
layout: post
slug: heranca-de-propriedades-entre-entidades-com-jpa
title: Herança de propriedades entre entidades com JPA
wordpress_id: 47
categories:
- Java
- JPA
- Programação
---

Muitas vezes temos várias entidades em um projeto que possuem propriedades em comum como código ou nome por exemplo e que para facilitar a criação dessas entidades pode-se criar uma superclasse que não é uma entidade e que contenha as propriedades que serão herdadas pelas entidades.

Vamos criar um cenário bem simples com duas entidades Cliente e Usuário para exemplificar, conforme a representação UML a seguir:

![](/images/2008/08/classes1.jpg)

Analisando este diagrama vemos que três propriedades são comuns entre as duas classes:

  * codigo	
  * nome
  * dataCadastro

Com isso irei mudar nosso diagrama e adicionar uma nova classe que irá conter as três propriedades que serão herdadas por outras classes. O novo diagrama UML ficará da seguinte forma:

![](/images/2008/08/classe2.jpg)

Falando um pouco sobre JPA, uma entidade pode herdar algo de uma superclasse sendo que esta superclasse é uma classe em seu modelo de domínio que não será transformada em uma entidade. Para resolver este problema temos a anotação **@javax.persistence.MappedSuperclass**.

Irei mostrar agora como ficará as entidades Cliente e Usuario fazendo herança das propriedades da classe Pessoa. Primeiro vou criar a superclasse Pessoa que será marcada com a anotação JPA MappedSuperclass:

{% highlight java linenos %}
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public abstract class Pessoa {

  @Id
  private Long codigo;

  @Column(length = 60, nullable = false)
  private String nome;

  @Temporal(TemporalType.DATE)
  private Date dataCadastro;

  //métodos get e set...
}
{% endhighlight %}

Agora vou criar as classes (entidades) Cliente e Usuario que herdarão as propriedades da classe Pessoa:

{% highlight java linenos %}
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "Usuarios")
public class Usuario extends Pessoa {

  @Column(length = 20, nullable = false)
  private String login;

  @Column(length = 20, nullable = false)
  private String senha;

  //métodos get e set...
}
{% endhighlight %}

{% highlight java linenos %}
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="Clientes")
public class Cliente extends Pessoa {

  @Column(length = 50)
  private String email;

  @Column(length = 100)
  private String endereco;

  @Column(length = 20)
  private String telefone;

  //métodos get e set...

}
{% endhighlight %}

Com isso teremos três classes, mas somente duas entidades. As classes (entidades) Cliente e Usuario vão herdar as propriedades da classe Pessoa que não é uma entidade.
