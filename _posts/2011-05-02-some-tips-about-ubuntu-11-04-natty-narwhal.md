---
comments: true
date: 2011-05-02 15:03:52
layout: post
slug: some-tips-about-ubuntu-11-04-natty-narwhal
title: Some tips about Ubuntu 11.04 Natty Narwhal
wordpress_id: 516
categories:
- Linux
- Sistema Operacional
- Ubuntu
tags:
- Linux
- Natty Narwhal
- operational system
- os
- tips
- Ubuntu
- unity
---

In April 28th, the [Canonical](http://www.canonical.com) released the version 11.04 (Natty Narwhal) of [Ubuntu](http://www.ubuntu.com/). On the same day I downloaded it to install on my workstation and I was surprised with [Unity UI](http://unity.ubuntu.com/), the launcher and the dash.

In this post I gathered some tips to customize/adjust it. ;)

  * How to add terminal applications to launcher

For example, if you want to add the [Eclipse IDE](http://www.eclipse.org/) into your launcher, you need to create a file with **".desktop"** extension and add the following content:

{% highlight ini linenos %}
#Eclipse.desktop
[Desktop Entry]
Version=3.6
Name=Eclipse
Comment=
Exec=/home/rodrigo/Programs/eclipse/eclipse
StartupWMClass=
Terminal=false
X-MultipleArgs=false
Type=Application
Icon=/home/rodrigo/Programs/eclipse/icon.xpm
StartupNotify=true
{% endhighlight %}

Then, drag and drop this file into the launcher.

  * How to show all icons in the system tray

By default, only a few icons are displayed in the tray. To show all icons, you need to open your terminal and type:

{% highlight bash linenos %}
gsettings set com.canonical.Unity.Panel systray-whitelist "['all']"
{% endhighlight %}

Then, restart Ubuntu.
	
  * How to remove the launcher auto-hide behavior

For it, you need to install the Advanced Desktop Effects Settings (ccsm)

{% highlight bash linenos %}
sudo apt-get install compizconfig-settings-manager
{% endhighlight %}

Then, use Alt+F2 shortcut key to open the "Run a command" dialog, type **about:config** and run it, change the property **Hide Launcher** to **Never.**
	
  * How to change the launcher icon size

Here, you also need install the Advanced Desktop Effects Settings (ccsm).

In the same window you used above, change the property **Laucher icon size** to another value.
	
  * How to add a CPU/memory monitor int the system tray

Just type in your terminal:

{% highlight bash linenos %}
sudo add-apt-repository ppa:alexeftimie/ppa
sudo apt-get update
sudo apt-get install indicator-sysmonitor
indicator-sysmonitor
{% endhighlight %}

You can put it (incidator-sysmonitor) in your Startup Application Preferences.