---
language: pt-br
comments: true
date: 2008-06-23 00:47:22
layout: post
slug: gerando-arquivos-pdf-a-partir-de-sua-aplicacao-java
title: Gerando arquivos PDF a partir de sua aplicação Java
wordpress_id: 28
categories:
- Java
- Programação
---

Uma forma de se gerar aquivos PDF diretamente de sua aplicação Java é utilizando um projeto da Apache chamado <a href="http://xmlgraphics.apache.org/fop/index.html" target="_blank">FOP (Formatting Objects Processor)</a>, veja a seguir uma breve descriçao retirada do próprio site do projeto:
<blockquote>FOP (Formatting Objects Processor) is the world's first print formatter driven by <a href="http://www.w3.org/TR/xsl/">XSL formatting objects (XSL-FO)</a> and the world's first output independent formatter. It is a Java application that reads a formatting object (FO) tree and renders the resulting pages to a specified output. The primary output target is PDF but other <a href="http://xmlgraphics.apache.org/fop/output.html">output formats</a> currently supported include:
<ul>
  <li>PDF (Portable Document Format)</li>
  <li>PS (Adobe Postscript)</li>
  <li>PCL (Printer Control Language)</li>
  <li>AFP (MO:DCA)</li>
  <li>SVG (Scalable Vector Graphics)</li>
  <li>XML (area tree representation)</li>
  <li>Print</li>
  <li>AWT/Java2D</li>
  <li>MIF</li>
  <li>RTF (Rich Text Format)</li>
  <li>TXT (text)</li>
</ul>
</blockquote>
Vou demonstrar com um pequeno exemplo, como utilizar a conversão de um documento XML em um documento PDF por uma aplicação Java.

Para iniciar o exemplo vou baixar o arquivo binário no endereço:

<a href="http://linorg.usp.br/apache/xmlgraphics/fop/binaries/fop-0.94-bin-jdk1.4.zip" target="_blank">http://linorg.usp.br/apache/xmlgraphics/fop/binaries/fop-0.94-bin-jdk1.4.zip</a>

Agora criarei um projeto java e irei incluir os seguintes jar's necessários para o exemplo que encontram-se no download feito:
<ul>
  <li>avalon-framework-4.2.0.jar</li>
  <li>batik-all-1.6.jar</li>
  <li>commons-io-1.3.1.jar</li>
  <li>commons-logging-1.0.4.jar</li>
  <li>fop.jar</li>
  <li>serializer-2.7.0.jar</li>
  <li>xalan-2.7.0.jar</li>
  <li>xercesImpl-2.7.1.jar</li>
  <li>xml-apis-1.3.02.jar</li>
  <li>xmlgraphics-commons-1.2.jar</li>
</ul>
Na raiz do projeto irei criar uma pasta chamada <em><strong>documentos</strong></em> e irei colocar um arquivo chamado <strong><em>projeto.xml</em></strong> com o seguinte conteúdo:

{% highlight xml linenos %}
< ?xml version="1.0" encoding="UTF-8"?>
<!-- $Id$ -->
<projeto>
  <nomeprojeto>Teste de Aplicacao usando Apache FOP</nomeprojeto>
  <membro>
    <nome>Rodrigo</nome>
    <funcao>Desenvolvedor</funcao>
    <email>teste@teste.com</email>
  </membro>
  <membro>
    <nome>Administrador</nome>
    <funcao>Gerente</funcao>
    <email>admin.teste@teste.com</email>
  </membro>
  <membro>
    <nome>Usuario</nome>
    <funcao>user</funcao>
    <email>user.teste@teste.com</email>
  </membro>
</projeto>
{% endhighlight %}

E também irei criar um estilo XSL para o documento XML chamado <strong><em>projeto.xsl</em></strong> dentro da pasta <em><strong>documentos</strong></em> com o seguinte conteúdo:

{% highlight xml linenos %}
< ?xml version="1.0" encoding="UTF-8"?>
<!-- $Id$ -->
<xsl :stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo">
  <xsl :output method="xml" version="1.0" omit-xml-declaration="no" indent="yes"/>
  <xsl :param name="versionParam" select="'1.0'"/>
  <!-- ========================= -->
  <!-- elemento principal: projeto           -->
  <!-- ========================= -->
</xsl>
<xsl :template match="projeto">
  <fo :root xmlns:fo="http://www.w3.org/1999/XSL/Format"></fo>
  <fo :layout-master-set></fo>
  <fo :simple-page-master master-name="simpleA4" page-height="29.7cm" page-width="21cm" margin-top="2cm" margin-bottom="2cm" margin-left="2cm" margin-right="2cm">
    <fo :region-body/>
  </fo>
  <fo :page-sequence master-reference="simpleA4"></fo>
  <fo :flow flow-name="xsl-region-body"></fo>
  <fo :block font-size="16pt" font-weight="bold" space-after="5mm">Projeto: <xsl :value-of select="nomeprojeto"/></fo>
  <fo :block font-size="12pt" space-after="5mm">Versão <xsl :value-of select="$versionParam"/></fo>
  <fo :block font-size="10pt"></fo>
  <fo :table table-layout="fixed" width="100%" border-collapse="separate">
    <fo :table-column column-width="4cm"/>
    <fo :table-column column-width="4cm"/>
    <fo :table-column column-width="5cm"/>
  </fo>
  <fo :table-body>
    <xsl :apply-templates select="membro"/>
  </fo>
</xsl>

<!-- ========================= -->
<!-- elemento filho: membro               -->
<!-- ========================= -->
<xsl :template match="membro">
  <fo :table-row>
    <xsl :if test="function = 'lead'"></xsl>
    <xsl :attribute name="font-weight">bold</xsl>
  </fo>
</xsl>

<fo :table-cell></fo>
<fo :block>
  <xsl :value-of select="nome"/>
</fo>

<fo :table-cell></fo>
<fo :block>
  <xsl :value-of select="funcao"/>
</fo>

<fo :table-cell></fo>
<fo :block>
  <xsl :value-of select="email"/>
</fo>
{% endhighlight %}

Finalmente uma pequena aplicação Java que irá gerar um documento PDF chamado projeto.pdf em uma pasta chamada <em><strong>saida</strong></em>.

{% highlight java linenos %}
package br.com.rodrigolazoti;

import java.io.File;
import java.io.OutputStream;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;

import org.apache.fop.apps.FOUserAgent;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;

public class ExportXMLtoPDF {

  public static void main(String[] args) {
    try {
      File baseDir = new File(".");
      File outDir = new File(baseDir, "saida");
      outDir.mkdir();

      File xmlfile = new File(baseDir, "documentos/projeto.xml");
      File xsltfile = new File(baseDir, "documentos/projeto.xsl");
      File pdffile = new File(outDir, "projeto.pdf");

      FopFactory fopFactory = FopFactory.newInstance();
      FOUserAgent foUserAgent = fopFactory.newFOUserAgent();
      OutputStream out = new java.io.FileOutputStream(pdffile);
      out = new java.io.BufferedOutputStream(out);

      try {
        Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, foUserAgent, out);

        TransformerFactory factory = TransformerFactory.newInstance();
        Transformer transformer = factory.newTransformer(new StreamSource(xsltfile));
        transformer.setParameter("versionParam", "2.0");

        Source src = new StreamSource(xmlfile);
        Result res = new SAXResult(fop.getDefaultHandler());
        transformer.transform(src, res);
      }
      finally {
        out.close();
      }
    }
    catch (Exception e) {
      e.printStackTrace(System.err);
      System.exit(-1);
    }
  }
}
{% endhighlight %}

Este exemplo foi baseado em um exemplo contido no download feito.