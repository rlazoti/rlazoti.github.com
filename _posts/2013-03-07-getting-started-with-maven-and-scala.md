---
comments: true
date: 2013-03-07 21:38:11
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
Even though <a href="http://www.scala-lang.org/" target="_blank">Scala</a> is commonly used with <a href="http://www.scala-sbt.org/" target="_blank">SBT</a>, it's also possible to use it with <a href="http://maven.apache.org/" target="_blank">Maven</a>, particularly if you already have a Maven based project and you want to use Scala with it.

So, let's use a pom.xml for a simple java application like this:

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

Right, now let's set up the project’s pom file to adding support for Scala code.

####Add scala-tools repository

The Maven needs to know where to find the plugin and the Scala library, so add this repository to pom.xml:

{% highlight xml linenos %}
<repositories>
	<repository>
		<id>scala-tools</id>
		<url>https://oss.sonatype.org/content/groups/scala-tools/</url>
	</repository>
</repositories>
{% endhighlight %}

####Add scala library dependency

The scala's version that I'll use for this example is 2.10.0.

Add this dependency to pom.xml:

{% highlight xml linenos %}
<dependency>
	<groupId>org.scala-lang</groupId>
	<artifactId>scala-library</artifactId>
	<version>2.10.0</version>
</dependency>
{% endhighlight %}

####Add maven-scala-plugin

Add the maven-scala-plugin to pom.xml:

{% highlight xml linenos %}
<build>
	<sourceDirectory>src/main/scala</sourceDirectory>
	<testSourceDirectory>src/test/scala</testSourceDirectory>
	<plugins>
		<plugin>
			<groupId>org.scala-tools</groupId>
			<artifactId>maven-scala-plugin</artifactId>
			<version>2.15.2</version>
			<executions>
				<execution>
					<goals>
						<goal>compile</goal>
						<goal>testCompile</goal>
					</goals>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
{% endhighlight %}

####Add some Scala code

Let's add some scala code to the project.

Create a file called **/src/main/scala/App.scala** and put the following code into it:

{% highlight scala linenos %}
object App extends App {

  List("Hello ", "world", "!") foreach print 

}
{% endhighlight %}

####Conclusion

From now on you can execute **mvn package** to build your project or **mvn test** to test your project, and the Scala code will get built automatically. ;)

See below the complete project’s pom file:

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

	<repositories>
		<repository>
			<id>scala-tools</id>
			<url>https://oss.sonatype.org/content/groups/scala-tools/</url>
		</repository>
	</repositories>

	<dependencies>
		<dependency>
			<groupId>org.scala-lang</groupId>
			<artifactId>scala-library</artifactId>
			<version>2.10.0</version>
		</dependency>

		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.11</version>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<sourceDirectory>src/main/scala</sourceDirectory>
		<testSourceDirectory>src/test/scala</testSourceDirectory>
		<plugins>
			<plugin>
				<groupId>org.scala-tools</groupId>
				<artifactId>maven-scala-plugin</artifactId>
				<version>2.15.2</version>
				<executions>
					<execution>
						<goals>
							<goal>compile</goal>
							<goal>testCompile</goal>
						</goals>
					</execution>
				</executions>
				<configuration>
					<args>
						<arg>-optimise</arg>
						<arg>-unchecked</arg>
						<arg>-deprecation</arg>
					</args>
					<charset>UTF-8</charset>
				</configuration>
			</plugin>
		</plugins>
	</build>
</project>
{% endhighlight %}
