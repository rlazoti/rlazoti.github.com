---
language: en
comments: true
date: 2015-01-08 22:00:00
layout: post
slug: send-finagle-stats-to-codahale-metrics
title: Send Finagle stats to Codahale Metrics
categories:
- twitter
- finagle
- scala
- metrics
- codahale
tags:
- twitter
- finagle
- scala
- metrics
- codahale
---

Last year I needed to send lots of metrics from some java applications to <a href="http://graphite.wikidot.com/" target="_blank">Graphite</a>, and I did it easily using a library called <a href="https://github.com/dropwizard/metrics" target="_blank">Metrics</a>.

Recently I had to send some stats from a <a href="https://github.com/twitter/finagle" target="_blank">Finagle</a> based application (<a href="http://twitter.github.io/finagle/guide/Metrics.html" target="_blank">Finagle collect and expose some metrics automatically</a>) to the same Graphite server, so I had tried the same approach using the Metrics library, and as a result, I ended up doing a finagle module called <a href="https://github.com/rlazoti/finagle-metrics" target="_blank">**finagle-metrics**</a>.

So let's see how to use it! :)

First things first. So, let's install the <a href="https://github.com/rlazoti/finagle-metrics" target="_blank">**finagle-metrics**</a> locally. To do that, just run:

{% highlight bash %}
git clone https://github.com/rlazoti/finagle-metrics.git
cd finagle-metrics
git checkout tags/version-0.0.1 -b version-0.0.1
sbt publish-local
{% endhighlight %}

After that you should see something like this output:

{% highlight bash %}
[info]  published finagle-metrics_2.11 to /Users/rodrigolazoti/.ivy2/local/com.github.rlazoti/finagle-metrics_2.11/0.0.1/poms/finagle-metrics_2.11.pom
[info]  published finagle-metrics_2.11 to /Users/rodrigolazoti/.ivy2/local/com.github.rlazoti/finagle-metrics_2.11/0.0.1/jars/finagle-metrics_2.11.jar
[info]  published finagle-metrics_2.11 to /Users/rodrigolazoti/.ivy2/local/com.github.rlazoti/finagle-metrics_2.11/0.0.1/srcs/finagle-metrics_2.11-sources.jar
[info]  published finagle-metrics_2.11 to /Users/rodrigolazoti/.ivy2/local/com.github.rlazoti/finagle-metrics_2.11/0.0.1/docs/finagle-metrics_2.11-javadoc.jar
[info]  published ivy to /Users/rodrigolazoti/.ivy2/local/com.github.rlazoti/finagle-metrics_2.11/0.0.1/ivys/ivy.xml
[success] Total time: 16 s, completed Jan 7, 2015 10:15:30 PM
{% endhighlight %}

Okay, the finagle-metris is now installed locally, so from now on we can add it as a dependency to our finagle application.
We need to create some folders and files, so let's do that:

{% highlight scala %}
mkdir -p finagle-example/src/main/scala/
cd finagle-example
touch build.sbt
touch src/main/scala/App.scala
{% endhighlight %}

Then I'm going to add the following content to **build.sbt**:

{% highlight scala %}
name := "finagle-example"

version := "0.0.1-SNAPSHOT"

scalaVersion := "2.11.4"

libraryDependencies ++= Seq(
  "com.twitter"        %% "twitter-server"  % "1.9.0",
  "com.github.rlazoti" %% "finagle-metrics" % "0.0.1"
)
{% endhighlight %}

And finally, let's create our finagle application. I'm gonna add the following content to **/src/main/scala/App.scala**:

{% highlight scala %}
import com.codahale.metrics.ConsoleReporter
import com.twitter.finagle.{Http, Service}
import com.twitter.finagle.metrics.MetricsStatsReceiver
import com.twitter.io.Charsets
import com.twitter.server.TwitterServer
import com.twitter.util.{Await, Future}
import org.jboss.netty.buffer.ChannelBuffers.copiedBuffer
import org.jboss.netty.handler.codec.http._
import java.util.concurrent.TimeUnit

object App extends TwitterServer {

  val service = new Service[HttpRequest, HttpResponse] {
    def apply(request: HttpRequest) = {
      val response = new DefaultHttpResponse(request.getProtocolVersion, HttpResponseStatus.OK)
      response.setContent(copiedBuffer("hello", Charsets.Utf8))
      Future.value(response)
    }
  }

  val reporter = ConsoleReporter
    .forRegistry(MetricsStatsReceiver.metrics)
    .convertRatesTo(TimeUnit.SECONDS)
    .convertDurationsTo(TimeUnit.MILLISECONDS)
    .build

  def main() {
    val server = Http.serve(":8080", service)
    reporter.start(5, TimeUnit.SECONDS)

    onExit {
      server.close()
    }

    Await.ready(server)
  }

}
{% endhighlight %}

Note that I used the <a href="https://dropwizard.github.io/metrics/3.1.0/manual/core/#man-core-reporters-console" target="_blank">ConsoleReporter</a> to report the Codahale's metrics to the console every five seconds.

Also, note that I didn't need to do anything related to the <a href="https://github.com/rlazoti/finagle-metrics" target="_blank">**finagle-metrics**</a>, I just needed to define a location (Reporter) to where the Codahale metrics will be sent, but the metrics themselves were sent automatically (Thanks Finagle for that). :)

To run our example, just execute the following command and wait a few seconds to see the metrics being displayed on the console:

{% highlight bash %}
sbt 'run-main App'
{% endhighlight %}

<a href="https://github.com/rlazoti/finagle-metrics" target="_blank">**Click here**</a> to see more about the finagle-metrics library.
