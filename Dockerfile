FROM ruby:2.4-alpine

RUN apk add --no-cache build-base gcc bash cmake nodejs

RUN gem install jekyll

RUN npm install -g grunt-cli

EXPOSE 4000

WORKDIR /site

COPY docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD [ "grunt" ]
