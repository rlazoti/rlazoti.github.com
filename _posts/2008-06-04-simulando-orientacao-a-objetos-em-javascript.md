---
language: pt-br
comments: true
date: 2008-06-04 22:57:03
layout: post
slug: simulando-orientacao-a-objetos-em-javascript
title: Orientação a objetos em Javascript
wordpress_id: 24
categories:
- Javascript
- Programação
---

Embora a maioria dos scripts feitos em Javascript seja feito utilizando utilizando programação estruturada, também pode-se utilizar os conceitos de orientação a objetos em Javascript.

Para exemplificar, irei me basear em uma classe chama Pessoa com atributos nome, idade e email, seus métodos getters e setters e um método chamado mostraValores que irá retorna uma string com os valores dos atributos da classe.

Veja o exemplo no código a seguir:

{% highlight javascript linenos %}
function Pessoa() {
  var nome;
  var idade;
  var email;

  this.getNome = getNome;
  this.getIdade = getIdade;
  this.getEmail = getEmail;
  this.setNome = setNome;
  this.setIdade = setIdade;
  this.setEmail = setEmail;
  this.mostraValores = mostraValores;

  function getNome() {
    return nome;
  }

  function getIdade() {
    return idade;
  }

  function getEmail() {
    return email;
  }

  function setNome(_nome) {
    nome = _nome;
  }

  function setIdade(_idade) {
    idade = _idade;
  }

  function setEmail(_email) {
    email = _email;
  }

  function mostraValores() {
    return 'Nome: ' + nome +'nIdade: '+ idade +' anosnEmail: '+ email;
  }
}
{% endhighlight %}

Agora vamos criar um javascript para manipular a classe Pessoa.

{% highlight javascript linenos %}
var rodrigo = new Pessoa();

rodrigo.setNome('Rodrigo Lazoti');
rodrigo.setIdade(26);
rodrigo.setEmail('rodrigo@test.com');

alert(rodrigo.mostraValores());
{% endhighlight %}

E com isso já temos um pequeno exemplo de uma forma de como utilizar orientação a objetos com Javascript.