bundle install
juicer install yui_compressor
juicer install closure_compiler
juicer install jslint
juicer merge css/base.css css/main.css css/normalize.css css/pygments.css -o css/base.min.css --force --document-root .