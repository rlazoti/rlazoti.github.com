---
comments: true
date: 2009-08-13 09:01:44
layout: post
slug: problema-com-iphone-os-3-0-1-no-provisioned-iphone-os-device-is-connected
title: Problema com iPhone OS 3.0.1 - No provisioned iPhone OS device is connected
wordpress_id: 157
categories:
- Artigos
- Programação
tags:
- Apple
- IPhone
- iPhone OS
- iPhone SDK
- Mac
- OS3.0
- SDK
- XCode
---

Despois que atualizei meu iPhone para a última versão do seu sistema operacional disponível ( 3.0.1 ), não conseguia mais testar minhas aplicações para iPhone desenvolvidas no xCode, pois sempre que tentava rodar a aplicação diretamene no iPhone eu recebia a seguinte mensagem:

<img title="iPhone301Fail" src="/images/2009/08/iPhone301Fail.jpg" alt="iPhone301Fail" width="422" />

Assim que vi esta mensagem lembrei que ja existia uma nova versão do iPhone SDK 3.1 beta3 e que já deveria dar suporte para a versão 3.0.1 do OS. Engano meu, apos fazer o download de cerca de 2,5Gb do novo SDK e instalá-lo vi que o problema continuou.

Então resolvi pedir ajuda ao oráculo ( Google ) e foi então que encontrei uma forma simples de resolver este problema na qual vou mostrar aqui para caso alguém mais precise.

O primeiro passo é ir até a pasta /Developer/Platforms/iPhoneOS.platform/DeviceSupport/ conforme imagem abaixo:

<img title="cmd1fail" src="/images/2009/08/cmd1fail.jpg" alt="cmd1fail" width="630" />

Depois vamos listar ( comando ls ) tudo que existe dentro dessa pasta e procurar por uma pasta chamada <strong>3.0</strong>

<img title="cmd2fail" src="/images/2009/08/cmd2fail.jpg" alt="cmd2fail" width="630" />
</strong>

Agora basta criar um "link simbólico" chamado 3.0.1 da pasta 3.0 conforme comando abaixo:

<img title="cmd3fail" src="/images/2009/08/cmd3fail.jpg" alt="cmd3fail" width="630"" />

Tudo pronto, agora é só reiniciar o XCode que ele voltará a reconhecer seu iPhone! :D