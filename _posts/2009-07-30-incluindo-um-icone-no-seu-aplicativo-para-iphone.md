---
comments: true
date: 2009-07-30 09:29:24
layout: post
slug: incluindo-um-icone-no-seu-aplicativo-para-iphone
title: Incluindo um ícone no seu aplicativo para iPhone
wordpress_id: 132
categories:
- Artigos
- Objective-C
- Programação
tags:
- App Store
- Apple
- Interface
- Interface Builder
- IPhone
- iPhone SDK
- Programação
- XCode
---

Esta é umas das partes mais fáceis de fazer em todo o desenvolvimento de um aplicativo usando iPhone SDK, mas nem por isso merece menos atenção afinal um ícone bem feito ajuda muito a despertar a vontade do usuário em utilizar seu aplicativo.

Para criar um ícone para um aplicativo do iPhone SDK, precisamos criar uma imagem de 57 x 57 pixels.

Você não precisa criar o efeito glass presente na maioria dos ícones presentes no iPhone, pois o iPhone já faz isto para você.

Neste exemplo irei utilizar a seguinte imagem no formato PNG.

![Icone MacDevelopers](/images/2009/07/MacDevelopers.png)

Criei um aplicativo chamado IconTest para iPhone SDK no Xcode sem nenhum codigo, utilizando o template View-Based Application.

Agora temos que arrastar o nosso icone para dentro do Xcode na pasta Resources, com isso sera apresentada uma tela confirmando a inclusão desse novo arquivo conforme a imagem a seguir:

![](/images/2009/07/addIcon1.jpg)

Agora o ícone ja e encontra disponível dentro do aplicativo conforme podemos ver na imagem a seguir:

![](/images/2009/07/addIcon2.jpg)

E para finalizar, vamos informar o nosso icone na propriedade icon file do arquivo IconTest-Info.plist:

![](/images/2009/07/addIcon3.jpg)

Pronto, agora vamos executar o aplicativo e conferir o resultado:

![](/images/2009/07/addIcon4.jpg)

Com isso, podemos ver como é simples incluir um ícone em aplicativos no iPhone SDK.