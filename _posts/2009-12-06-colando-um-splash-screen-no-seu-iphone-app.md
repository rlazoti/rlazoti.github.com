---
language: pt-br
comments: true
date: 2009-12-06 17:31:17
layout: post
slug: colando-um-splash-screen-no-seu-iphone-app
title: Colando um Splash Screen no seu iPhone app
wordpress_id: 206
categories:
- Artigos
- Objective-C
- Programação
tags:
- Apple
- Cocoa
- Interface Builder
- IPhone
- iPhone SDK
- Objective-C
- Programação
- SDK
- XCode
---

Adicionar um Splash Screen em um aplicativo do iPhone parece ser uma tarefa complicada mas é extremamente simples.

Neste artigo vou mostrar duas formas de fazer isso, a primeira irá utilizar toda a lógica do iPhone SDK e com isso não precisaremos codificar nada, já na segunda a nossa aplicação irá gerenciar o splash e por conta disso teremos que codificar um pouco.

Nos exemplos desse artigo irei utilizar a seguinte imagem como splash screen:

[![Splash Screen](/images/2009/12/Default.png)](/images/2009/12/Default.png)

Esta imagem deve ter o nome **Default.png**, vou criar um novo aplicativo para iPhone SDK do tipo **View-Based Application** chamado **splash-screen** e adicionar esta esta imagem na pasta chamada **Resources** e pronto a primeira forma já esta pronto. É só rodar o aplicativo no simulador e o splash vai ser apresentado no carregamento do aplicativo.

Na outra forma, teremos que codificar um pouco então abra a interface _splash_screenViewController.h_ e adicione dois métodos e um novo atributo:

{% highlight objective-c linenos %}
@interface iCrazyFaceViewController : UIViewController {
IBOutlet UIView *splashScreenView;
}

- (void)showSplash;
- (void)hideSplash;

@end
{% endhighlight %}

Agora na classe _splash_screenViewController.m_ vamos colocar a implementação desses métodos:

{% highlight objective-c linenos %}
-(void)showSplash
{
UIViewController *modalViewController = [[UIViewController alloc] init];
modalViewController.view = splashScreenView;
[self presentModalViewController:modalViewController animated:NO];
[self performSelector:@selector(hideSplash) withObject:nil afterDelay:2.0];
}

//hide splash screen
- (void)hideSplash{
[[self modalViewController] dismissModalViewControllerAnimated:YES];
}
{% endhighlight %}

Abra pelo **Interface Builder** o arquivo _splash_screenViewController.xib_, adicione uma nova view e renomeie-a para SplashScreenView.
Nesta nova view criada, adicione um **UIImageView** e na propriedade image desse componente selecione a nossa imagem Default.png.
Conforme imagem a seguir, vamos fazer a ligação da view (SplashScreenView) com o Outlet que criamos na classe iCrazyFaceViewController chamado splashScreenView.

[caption id="attachment_209" align="alignnone" width="300" caption="Ligando outlet pelo interface builder"][![Ligando outlet pelo interface builder](/images/2009/12/Screen-shot-2009-12-06-at-5.48.55-PM-300x187.png)](/images/2009/12/Screen-shot-2009-12-06-at-5.48.55-PM.png)[/caption]

Pronto, o exemplo já está pronto! Salve o arquivo no Interface Builder, volte para o Xcode e execute a aplicação para conferir o resultado. :)

O projeto criado neste exemplo está disponível para download no git:

[http://github.com/rlazoti/iphonesdk-splash-screen](http://github.com/rlazoti/iphonesdk-splash-screen)