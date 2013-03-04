---
comments: true
date: 2013-02-28 20:46:11
layout: post
slug: getting-started-with-maven-and-scala
title: Getting started with Maven and Scala
categories:
- scala
- maven
- eclipse
- java
tags:
- scala
- maven
- eclipse
- java
---
Even though Scala is commonly used with SBT, it's also possible to use it with Maven, particularly if you already have a Maven based project and you want to use Scala with it.

So, let's imagine a pom.xml like this:

{% highlight xml linenos %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>br.com.rodrigolazoti</groupId>
	<artifactId>scalaproject</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
	</properties>

	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.11</version>
			<scope>test</scope>
		</dependency>
	</dependencies>
</project>
{% endhighlight %}
