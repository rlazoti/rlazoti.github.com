bundle install
juicer install jslint
juicer merge assets/css/site.css -o assets/css/site.min.css --force --document-root .
cp _site/sitemap.xml .
