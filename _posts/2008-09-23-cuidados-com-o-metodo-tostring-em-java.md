---
comments: true
date: 2008-09-23 00:23:39
layout: post
slug: cuidados-com-o-metodo-tostring-em-java
title: Cuidados com o método toString() em Java
wordpress_id: 75
categories:
- Java
- Programação
---

Costumei ver algumas vezes trechos de códigos em Java onde seus desenvolvedores utilizaram o método toString() como um método conversor para String, quando na verdade a finalidade desse método é somente permitir que se obtenha algum representação significativa de um determinado objeto. A classe Object, que é a classe primordial possui este método e como todas as outras classes são herdadas da classe Object, todas elas têm um método toString().

Irei mostrar dois exemplos dos que mais costumo ver e também mostrar alguns cuidados que deve-se tomar:

Pegar um parâmetro da requisição:
{% highlight java linenos %}
String value = request.getParameter("parametro").toString();
{% endhighlight %}

De cara já é um código estranho, pois não existe a necessidade de converter o valor do parâmetro para String já que o método getParameter() já retorna uma String. Outro problema é que caso o parametro não exista você vai receber um belo NullPointerException. O correto seria:

{% highlight java linenos %}
String value = request.getParameter("parametro");
{% endhighlight %}

Pegar atributo da requisição:
{% highlight java linenos %}
String value = request.getAttribute("parametro").toString();
{% endhighlight %}

Parecido com o primeiro exemplo, caso o atributo não existe será lançado um NullPointerException. Como este método retorna um Object realmente devemos converter o valor do atributo para o tipo esperado, mas uma melhor forma de fazer essa conversão seria:
{% highlight java linenos %}
String value = (String) request.getAttribute("parametro");
{% endhighlight %}

Com isso deixo um pequena dica de como evitar bugs...
