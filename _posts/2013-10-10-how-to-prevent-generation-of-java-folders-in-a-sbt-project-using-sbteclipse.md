---
language: en
comments: true
date: 2013-10-10 23:05:00
layout: post
slug: how-to-prevent-generation-of-java-folders-in-a-sbt-project-using-sbteclipse
title: How to prevent generation of Java folders in a SBT project using sbteclipse
categories:
- scala
- sbt
- java
tags:
- scala
- sbt
- java
---
If you're using <a href="https://github.com/typesafehub/sbteclipse" target="_blank">sbteclipse</a> in a <a href="" target="_blank">SBT</a> project and there are no Java files in your project, you don't need of both src/main/java and src/test/java folders. But every time you run "sbt eclipse", the Java folders are regenerated.

There is a way to prevent those directories from being generated.
To do that you need to avoid the Java source directories to be created, simply redefine unmanagedSourceDirectories by adding these two settings:

{% highlight scala linenos %}
unmanagedSourceDirectories in Compile <<= (scalaSource in Compile)(Seq(_)),
unmanagedSourceDirectories in Test <<= (scalaSource in Test)(Seq(_))
{% endhighlight %}

And it's an example of a build.scala file, see how you can add those settings:

{% highlight scala linenos %}
object AppBuilder extends Build {

  val appSettings = Seq(
    name := "apptest",
    organization := "com.rlazoti",
    version := "0.0.1-SNAPSHOT",
    scalaVersion := "2.10.2",
    unmanagedSourceDirectories in Compile <<= (scalaSource in Compile)(Seq(_)),
    unmanagedSourceDirectories in Test <<= (scalaSource in Test)(Seq(_))
  )

  lazy val app = Project("apptest", file("."))
    .settings(appSettings : _*)

}
{% endhighlight %}
