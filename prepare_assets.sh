bundle install
juicer install yui_compressor
juicer install closure_compiler
juicer install jslint
juicer merge css/base.css css/pygments.css -o css/base.min.css --force --document-root .
juicer merge css/main.css css/normalize.css  -o css/normalize.min.css --force --document-root .