---
comments: true
date: 2009-03-10 14:47:45
layout: post
slug: exceptions-em-ruby-rescue-retry-e-ensure
title: Exceptions em Ruby {Rescue, Retry e Ensure}
wordpress_id: 144
categories:
- Ruby
tags:
- Ruby
---

Ruby é uma linguagem que tem aparecido bastante e obtido um grande destaque no mundo do desenvolvimento de software por sua agilidade e simplicidade, assim como muitos desenvolvedores acabei estudando a linguagem por curiosidade e tenho gostado dos resultados.

Mas voltando ao foco do post, vou apresentar de uma forma resumida como a linguagem Ruby lida com o tratamento de exceptions utilizando os comandos Rescue, Retry e Ensure.

**rescue:** fornece uma forma de tratar uma exception lançada, ele é parecido com o _catch do Java_.

Exemplo de rescue:
{% highlight ruby linenos %}
begin
  eval algumaCoisaQueNaoExiste

rescue NameError => boom
  puts "variavel local ou metodo indefinido."
end
{% endhighlight %}

**ensure:** fornece uma forma de garantir que o código sempre irá rodar independente de uma exception ser lançada ou não. Parecido com o _finally do Java_.

Exemplo de ensure:
{% highlight ruby linenos %}
begin
  eval algumaCoisaQueNaoExiste

rescue NameError => boom
  puts "variavel local ou metodo indefinido."

ensure
  puts "fim do programa."
end
{% endhighlight %}

**retry:** este certamente é o comando mais interessante de todos, pois com ele podemos "dar uma segunda chance" para o método caso ocorra alguma exception.

Para exemplificar o retry vou criar uma classe com um unico metodo que tem por finalidade somar dois numeros positivos. Inicialmente não irei utilizar o retry para ver como o código irá se comportar.

{% highlight ruby linenos %}
class Calculator

  def sum_positive_numbers(first_number,  second_number)
  begin

    if first_number < 0 or second_number < 0
      raise ArgumentError, "The value can not be less than zero."
    else
      return "#{first_number} + #{second_number} = #{first_number + second_number}"
    end

    rescue ArgumentError => exception
      if first_number < 0
        puts "#{exception} Current Value = #{first_number}"
      end

      if second_number < 0
        puts "#{exception} Current Value = #{second_number}"
      end
    end

  end
end
{% endhighlight %}

Agora vamos testar o método e ver seu resultado

{% highlight ruby linenos %}
  calculator = Calculator.new
  puts calculator.sum_positive_numbers( 0, 0 )
  puts calculator.sum_positive_numbers( 5, 2 )
  puts calculator.sum_positive_numbers( -5, 2 )
  puts calculator.sum_positive_numbers( 5, -2 )
  puts calculator.sum_positive_numbers( -5, -2 )
{% endhighlight %}

Resultado:

{% highlight console linenos %}
0 + 0 = 0
5 + 2 = 7
The value can not be less than zero. Current Value = -5
nil
The value can not be less than zero. Current Value = -2
nil
The value can not be less than zero. Current Value = -5
The value can not be less than zero. Current Value = -2
nil
{% endhighlight %}

Agora vou fazer uma pequena alteração no método para caso algum de seus argumentos seja negativo, o mesmo receba o valor 0 e seja refeito o cálculo.

{% highlight ruby linenos %}
class Calculator

  def sum_positive_numbers(first_number,  second_number)
  begin

    if first_number < 0 or second_number < 0
      raise ArgumentError, "The value can not be less than zero."
    else
      return "#{first_number} + #{second_number} = #{first_number + second_number}"
    end

    rescue ArgumentError => exception

      if first_number < 0
        puts "#{exception} Current Value = #{first_number} | New Value 0"
        first_number = 0
      end

      if second_number < 0
        puts "#{exception} Current Value = #{second_number} | New Value 0"
        second_number = 0
      end

      #aqui eu peço para tentar novamente
      retry

    end
  end
end
{% endhighlight %}

Finalmente vamos testar no metodo utilizando o comando retry.

{% highlight ruby linenos %}
  calculator = Calculator.new
  puts calculator.sum_positive_numbers( 0, 0 )
  puts calculator.sum_positive_numbers( 5, 2 )
  puts calculator.sum_positive_numbers( -5, 2 )
  puts calculator.sum_positive_numbers( 5, -2 )
  puts calculator.sum_positive_numbers( -5, -2 )
{% endhighlight %}

O resultado será:

{% highlight console linenos %}
0 + 0 = 0
5 + 2 = 7
The value can not be less than zero. Current Value = -5 | New Value 0
0 + 2 = 2
The value can not be less than zero. Current Value = -2 | New Value 0
5 + 0 = 5
The value can not be less than zero. Current Value = -5 | New Value 0
The value can not be less than zero. Current Value = -2 | New Value 0
0 + 0 = 0
{% endhighlight %}

Um único problema é que se não tormar cuidado, podemos fazer o software entrar em um retry infinito. Para entender o que estou dizendo basta alterar umas das atribuições de valor 0, como por exemplo first_number = 0 para um valor negativo como first_number = -10. Rode o programa e veja o que acontece. :D

Com isso já deu para conhecer um pouco do que a linguagem Ruby é capaz! ;)
