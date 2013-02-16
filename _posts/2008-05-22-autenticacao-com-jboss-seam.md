---
comments: true
date: 2008-05-22 01:00:57
layout: post
slug: autenticacao-com-jboss-seam
title: Autenticação com Jboss Seam
wordpress_id: 21
categories:
- Java
- Jboss Seam
- JSF
- Programação
---

O frameword [Jboss Seam](http://www.seamframework.org/) facilita muito o desenvolvimento, recentemente precisei incluir uma rotina de autenticação em um projeto que utiliza o seam 2.0 e achei bem tranquilo a forma de se fazer esta implementação.

Para fazer isso basta criar uma _Seam Entity_ chamada **_Usuario_**, adicionei quatro atributos: id, nome, login e senha.

{% highlight java linenos %}
import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USUARIO")
public class Usuario implements Serializable {

private Long id;
private String nome;
private String login;
private String senha;

@Id
@Column(name = "USUARIO_ID")
public Long getId() {
return id;
}

public void setId(Long id) {
this.id = id;
}

@Column(name="NOME", length=50)
public String getNome() {
return nome;
}

public void setNome(String nome) {
this.nome = nome;
}

@Column(name="SENHA", length=64)
public String getSenha() {
return senha;
}

public void setSenha(String senha) {
this.senha = senha;
}

@Column(name="LOGIN", length=25)
public String getLogin() {
return login;
}

public void setLogin(String login) {
this.login = login;
}
}
{% endhighlight %}

<!-- more -->

Na _Seam Action_ chama **_UsuarioList_** que foi gerada pelo seam, inclui um método para fazer a pesquisa de usuário pelo seu login e senha:

{% highlight java linenos %}
import java.security.NoSuchAlgorithmException;

import org.jboss.seam.annotations.Name;
import org.jboss.seam.framework.EntityQuery;

import com.seedts.rfid.entity.Usuario;
import com.seedts.rfid.util.Criptografia;
import com.seedts.rfid.util.UtilException;

@Name("usuarioList")
public class UsuarioList extends EntityQuery {
@Override
public String getEjbql() {
return "select usuario from Usuario usuario";
}

public Usuario login(String login, String senha) {
Usuario usuario = (Usuario) this.getEntityManager().createQuery(
"select u from Usuario as u where u.login = :login")
.setParameter("login", login)
.getSingleResult();

if (usuario.getSenha().equals(senha))
return usuario;
else
return null;
}
}
{% endhighlight %}

E para finalizar basta alterar o método _authenticate()_ da classe **_Authenticator_** que também é gerada pelo seam:

{% highlight java linenos %}
import java.security.NoSuchAlgorithmException;

import org.jboss.seam.annotations.In;
import org.jboss.seam.annotations.Logger;
import org.jboss.seam.annotations.Name;
import org.jboss.seam.contexts.Contexts;
import org.jboss.seam.faces.FacesMessages;
import org.jboss.seam.log.Log;
import org.jboss.seam.security.Identity;

import com.seedts.rfid.entity.Usuario;
import com.seedts.rfid.util.UtilException;

@Name("authenticator")
public class Authenticator {
@Logger
Log log;

@In
Identity identity;

@In
FacesMessages facesMessages;

public boolean authenticate() throws NoSuchAlgorithmException, UtilException {

Usuario usuario = new UsuarioList().login(identity.getUsername(), identity.getPassword());

if (usuario != null) {
Contexts.getSessionContext().set("usuario", usuario);
identity.addRole("admin");
return true;

}
else
return false;
}
}
{% endhighlight %}

E com isso a autenticação básica do projeto já esta funcionando.
