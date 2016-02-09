---
language: pt-br
comments: true
date: 2008-05-07 12:28:41
layout: post
slug: testes-unitarios-com-testng
title: Testes unitários com TestNG
wordpress_id: 5
categories:
- Java
- Programação
- Testes Unitários
---

Irei fazer uma breve introdução ao framework de testes baseado no [JUnit](http://www.junit.org/), o framework [TestNG](http://testng.org/).

Já o utilizei em alguns projetos e algumas funcionalidades que gosto nele são:

* Suporte a anotações.
* Suporte para prover dados aos testes (@DataProvider).
* Suporte a dependência (dependsOnMethods, dependsOnGroups) e agrupamento (groups) de métodos e/ou grupos de métodos.
* Suporte a parâmetros (parameters).

No próprio site do framework existem plugins para Eclipse, Netbeans e IDEA IntelliJ.

Agora mostrarei um pequeno exemplo de um teste unitário utilizando o TestNG:

{% highlight java linenos %}
package br.com.rodrigolazoti.testes;

import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class MeuTeste {

  @BeforeClass(description = "Este método será invocado quando este teste é instanciado")
  public void configurar() {
  }

  @Test(dataProvider = "dados", description = "Testa se o valor informado como parâmetro é nulo")
  public void testaValorNulo(Integer valor) {
    Assert.assertNotNull(valor, "Valor informado é nulo!");
  }

  @Test(dataProvider = "dados", dependsOnMethods = { "testaValorNulo" }, description = "Teste se o valor informado como parâmetro é positivo")
  public void testaNumeroPositivo(Integer valor) {
    Assert.assertTrue(valor >= 0, "O valor é negativo!");
  }

  /**
  *
  * Provê dados para os testes serem realizados.
  *
  * @return Retorna um array multidimensional.
  *
  */
  @DataProvider(name = "dados")
  public Object[][] gerarDados() {
    return new Object[][] { { -10 }, { 0 }, { 10 }, { null } };
  }
}
{% endhighlight %}