---
comments: true
date: 2008-06-10 00:05:02
layout: post
slug: administrando-e-controlando-impressoras-no-linux-via-web
title: Controlando impressoras no Linux via web
wordpress_id: 26
categories:
- Linux
- Sistema Operacional
---

Para quem está acostumado a utilizar o linux, provavelmente já deve conhecer o [CUPS](http://www.cups.org ) (Common Unix Printing System) o gerencinciador de impressão que pode ser controlado via web.

Na própria página inicial do gerenciador existe uma introdução, que é a seguinte:


> CUPS provides a portable printing layer for UNIX®-based operating systems. It is developed and maintained by [Apple Inc.](http://www.apple.com/) to promote a standard printing solution. CUPS is the standard printing system used on MacOS® X and most Linux® distributions.

CUPS uses the [ Internet Printing Protocol ("IPP")](http://www.pwg.org/ipp/) as the basis for managing print jobs and queues and adds network printer browsing and PostScript Printer Description ("PPD") based printing options to support real-world printing.


Para acessar a interface de controle web do gerenciador de impressão, basta acessar o seguinte endereço de qualquer browser instalado no linux:

**http://localhost:631/**

Através desta interface web pode-se adicionar, alterar, configurar ou remover uma impressora, cancelar impressões entre outras configurações.