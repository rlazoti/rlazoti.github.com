Blog
====

My personal blog [http://rodrigolazoti.com.br](http://rodrigolazoti.com.br)


## What am I using here?

### Ruby

* Jekyll

### Javascript

* Grunt
* Zepto


## How do I execute it locally?

Just type:

```sh
$ grunt
```

Then use http://localhost:4000 to access the blog through your browser.


## How do I publish a new version?

Type:

```sh
$ grunt publish
```

It'll create a new build version, execute cssmin and uglify, after that the process will make a git commit and automatically publish it to github.
