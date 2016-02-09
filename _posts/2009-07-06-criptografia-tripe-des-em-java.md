---
language: pt-br
comments: true
date: 2009-07-06 00:10:59
layout: post
slug: criptografia-tripe-des-em-java
title: Criptografia Triple DES em Java
wordpress_id: 251
categories:
- Java
- Programação
tags:
- Criptografia
- DES
- Java
- JSE
- Triple DES
---

Um dos posts que mais foram acessados e comentados em meu blog foi um escrito sobre [Criptografia em Java utilizando Hashs criptográficos.](/2008/10/03/como-utilizar-criptografia-em-java/)

Depois de receber alguns pedidos resolvi escrever este novo post utilizando no exemplo uma criptografia do tipo Triple DES, com esta criptografia podemos encriptografar e descriptografar informações utilizando Java.

Triple DES é a mais segura versão do algoritmo original Data Encryption Standard (DES) e você pode [saber sobre este algoritmo aqui.](http://en.wikipedia.org/wiki/Triple_DES)

Agora vamos a implementação do algoritmo, eu criei uma classe simples que fornece dois métodos de instância para encriptografar e descriptografar uma String.

{% highlight java linenos %}
package br.com.rodrigolazoti;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

/**
 * Class that supplies a criptography of triple type DES.
 * @author Rodrigo Lazoti
 * @since 05/07/2009
 */
public class CryptographyTripleDES {
   private Cipher cipher;
   private byte[] encryptKey;
   private KeySpec keySpec;
   private SecretKeyFactory secretKeyFactory;
   private SecretKey secretKey;

   /**
   * Method that create a new instance of class.
   * @return
   * @throws InvalidKeyException
   * @throws UnsupportedEncodingException
   * @throws NoSuchAlgorithmException
   * @throws NoSuchPaddingException
   * @throws InvalidKeySpecException
   */
   public static CryptographyTripleDES newInstance() throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeySpecException {
     return new CryptographyTripleDES();
   }

   /**
   * Default Constructor.
   * @throws UnsupportedEncodingException
   * @throws NoSuchAlgorithmException
   * @throws NoSuchPaddingException
   * @throws InvalidKeyException
   * @throws InvalidKeySpecException
   */
   private CryptographyTripleDES() throws UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidKeySpecException {
     String key = "http://www.rodrigolazoti.com.br";
     encryptKey = key.getBytes( "UTF-8" );
     cipher = Cipher.getInstance( "DESede" );
     keySpec = new DESedeKeySpec( encryptKey );
     secretKeyFactory = SecretKeyFactory.getInstance( "DESede" );
     secretKey = secretKeyFactory.generateSecret( keySpec );
   }

   /**
   * Method that encrypts a value.
   * @param value
   * @return
   * @throws InvalidKeyException
   * @throws IllegalBlockSizeException
   * @throws BadPaddingException
   * @throws UnsupportedEncodingException
   */
   public String encrypt( String value ) throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException, UnsupportedEncodingException {
     cipher.init( Cipher.ENCRYPT_MODE, secretKey );
     byte[] cipherText = cipher.doFinal( value.getBytes( "UTF-8" ) );
     BASE64Encoder encoder = new BASE64Encoder();
     return encoder.encode( cipherText );
   }

   /**
   * Methot that decrypts a value.
   * @param value
   * @return
   * @throws InvalidKeyException
   * @throws IllegalBlockSizeException
   * @throws BadPaddingException
   * @throws IOException
   */
   public String decrypt( String value ) throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException, IOException {
     cipher.init( Cipher.DECRYPT_MODE, secretKey );
     BASE64Decoder dec = new BASE64Decoder();
     byte[] decipherText = cipher.doFinal( dec.decodeBuffer( value ) );
     return new String( decipherText );
   }

}
{% endhighlight %}

A seguir criei uma pequena classe para realizar um teste:

{% highlight java linenos %}
package br.com.rodrigolazoti;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

public class TestCryptographyTripleDES {

  public static void main( String[] args ) throws InvalidKeyException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeySpecException, IllegalBlockSizeException, BadPaddingException, IOException {

   CryptographyTripleDES cryptography = CryptographyTripleDES.newInstance();
   String value = "Rodrigo Lazoti";
   System.out.println( "Valor utilizado => " + value );
   String encryptedValue = cryptography.encrypt( value );
   System.out.println( "Valor criptografado => " + encryptedValue );
   String decryptedValue = cryptography.decrypt( encryptedValue );
   System.out.println( "Valor descriptografado => " + decryptedValue );
 }

}
{% endhighlight %}

O resultado do teste é:

{% highlight console linenos %}
Valor utilizado => Rodrigo Lazoti
Valor criptografado => RgYlMeQBUcyx6419bKlqRw==
Valor descriptografado => Rodrigo Lazoti
{% endhighlight %}

Com isso já temos uma boa base de como utilizar este tipo de criptografia em aplicações Java.
