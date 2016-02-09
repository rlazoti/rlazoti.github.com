---
language: pt-br
comments: true
date: 2008-10-03 17:22:43
layout: post
slug: como-utilizar-criptografia-em-java
title: Como utilizar criptografia em Java
wordpress_id: 81
categories:
- Java
- Programação
---

Java fornece uma api [Java Cryptography Architecture](http://java.sun.com/j2se/1.4.2/docs/guide/security/CryptoSpec.html) para trabalhar com criptografia de dados e através dessa api conseguimos criptografar dados em vários tipos de algoritmos como MD5 e SHA. Com isso, vou aplicar os recursos dessa api em uma aplicação Java.

Neste exemplo irei demonstrar como utilizar os algoritmos MD5, SHA-256 e SHA-512 e caso queira saber mais, nos endereços a seguir você poderá entender melhor como esses algoritmos funcionam.

[Referência para algoritmo SHA.](http://pt.wikipedia.org/wiki/SHA)
[Referência para algoritmo MD5.](http://pt.wikipedia.org/wiki/MD5)

O exemplo que irei criar está representado no driagrama UML a seguir:

![](/images/2008/10/cryptography.jpg)

Agora vamos ao código, irei começar criando a interface Cryptography.java

{% highlight java linenos %}
import java.security.NoSuchAlgorithmException;

public interface Cryptography {

  String encrypt(String value) throws NoSuchAlgorithmException;

}
{% endhighlight %}

Agora vou criar uma classe abstrata que conterá o básico para efetuar uma criptografia, contudo esta classe não será responsável por determinal qual tipo de algoritmo será utilizado.

{% highlight java linenos %}
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import sun.misc.BASE64Encoder;

public abstract class CryptographyGeneric {

  private MessageDigest messageDigest;
  private BASE64Encoder encoder;

  protected void useAlgorithm(String algorithm) throws NoSuchAlgorithmException {
    if (messageDigest == null || messageDigest.getAlgorithm() != algorithm) {
      messageDigest = MessageDigest.getInstance(algorithm);
    }

    if (encoder == null) {
      encoder = new BASE64Encoder();
    }
  }

  protected String encryptByAlgorithm(String algorithm, String value) throws NoSuchAlgorithmException {
    if (value == null) {
      throw new IllegalArgumentException("The value is null.");
    }

    useAlgorithm(algorithm);
    byte[] hash = messageDigest.digest(value.getBytes());
    return encoder.encode(hash);
  }
}
{% endhighlight %}

Agora irei criar as classes que especificam qual tipo de algoritmo irá ser utilizado.
Primeiro vou criar a classe para o algoritmo MD5.

{% highlight java linenos %}
import java.security.NoSuchAlgorithmException;

public class CryptographyMD5 extends CryptographyGeneric implements Cryptography {

  public String encrypt(String value) throws NoSuchAlgorithmException {
    return encryptByAlgorithm("MD5", value);
  }

}
{% endhighlight %}

Para o algoritmo SHA-256.
{% highlight java linenos %}
import java.security.NoSuchAlgorithmException;

public class CryptographySHA256 extends CryptographyGeneric implements Cryptography {

  public String encrypt(String value) throws NoSuchAlgorithmException {
    return encryptByAlgorithm("SHA-256", value);
  }

}
{% endhighlight %}

E finalmente para o algoritmo SHA-512.
{% highlight java linenos %}
import java.security.NoSuchAlgorithmException;

public class CryptographySHA512 extends CryptographyGeneric implements Cryptography {

  public String encrypt(String value) throws NoSuchAlgorithmException {
    return encryptByAlgorithm("SHA-512", value);
  }

}
{% endhighlight %}

Pronto, já temos nossas classes. Com isso podemos utilizar varios tipos de algoritmos em um mesmo objeto do tipo Cryptography.

Vamos realizar alguns testes:

{% highlight java linenos %}
public static void main(String[] args) throws NoSuchAlgorithmException {

  Cryptography cryptography;

  //Criptografia usando MD5
  cryptography = new CryptographyMD5();
  System.out.println("MD5: " + cryptography.encrypt("Java Cryptography Architecture"));

  //Criptografia usando SHA-256
  cryptography = new CryptographySHA256();
  System.out.println("SHA-256: " + cryptography.encrypt("Java Cryptography Architecture"));

  //Criptografia usando SHA-512
  cryptography = new CryptographySHA512();
  System.out.println("SHA-512: " + cryptography.encrypt("Java Cryptography Architecture"));

}
{% endhighlight %}

O resultado desse teste será:

{% highlight console linenos %}
MD5: cJL5LHVk/rjt0HYpNoi/1g==
SHA-256: OtvmRxbTc7fp3SnfSKTgXVi81Gvp7+QPl1B4aCvLU48=
SHA-512: YSsyP2VOGxlwcX873AxlVGqTX4DsJE6XOBTQkjjX4M2zhrMChnohHIejLe1W7RRrfvfMMODiMBou
LqOXHXknig==
{% endhighlight %}