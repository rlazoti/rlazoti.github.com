bundle install
juicer install jslint
juicer merge css/base.css css/pygments.css css/normalize.css -o css/app.min.css --force --document-root .
juicer merge css/iphone.css -o css/iphone.min.css --force --document-root .
cp _site/sitemap.xml .