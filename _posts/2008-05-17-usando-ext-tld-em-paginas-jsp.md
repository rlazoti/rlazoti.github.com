---
language: pt-br
comments: true
date: 2008-05-17 20:04:07
layout: post
slug: usando-ext-tld-em-paginas-jsp
title: Framework javascript Extjs em páginas jsp com tags tld
wordpress_id: 17
categories:
- Ajax
- Java
- Javascript
- Programação
---

Para quem deseja utilizar os recursos do framework javascript Extjs em seus projetos java, irei dar uma dica bem legal de como utilizar este framework através de TLD para páginas jsp.

O download dos arquivos tld deve ser feito no endereço [http://www.exttld.com/index.php?content=terms#download](http://www.exttld.com/index.php?content=terms#download){:target='_blank'}

Após o download basta descompactar o arquivo zip em um subdiretório chamado ext dentro do caminho _/projeto/WEB-INF/tags/_

Copie os seguintes jars para a pasta lib:

* commons-beansutils.jar
* commons-logging.jar
* jstl.jar
* standard.jar

Pronto, já é possível utilizar as tags nas páginas jsp. irei colocar um pequeno exemplo da utilização de tags.

{% highlight jsp linenos %}
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib tagdir="/WEB-INF/tags/ext" prefix="ext" %>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title></title>
</meta>
</head>
<body>
  <ext :body debug="true" loadingMask="true"></ext>
  <ext :viewport layout="table"></ext>
  <ext :form.formPanel width="400" title="Cadastro">
    <ext :form.textField fieldLabel="Nome" name="nome"/>
    <ext :form.numberField fieldLabel="Idade" name="idade" value="0"/>
    <ext :form.timeField fieldLabel="Hora Cadastro" name="hora"/>
    <ext :datePicker id="Data" format="d/m/y"/>
    <ext :button type="submit" text="Enviar" id="enviar" />
  </ext>
</body>
</html>
{% endhighlight %}