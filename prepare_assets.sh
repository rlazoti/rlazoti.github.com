bundle install
juicer install jslint
juicer merge css/base.css      -o css/base.min.css      --force --document-root .
juicer merge css/pygments.css  -o css/pygments.min.css  --force --document-root .
juicer merge css/normalize.css -o css/normalize.min.css --force --document-root .
juicer merge css/main.css      -o css/main.min.css      --force --document-root .