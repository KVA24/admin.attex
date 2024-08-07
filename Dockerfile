# build environment
FROM node:20.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN yarn install
COPY src /app/src
COPY public /app/public
COPY webpack-rtl.config.js /app
COPY tsconfig.json /app
COPY tailwind.config.js /app
COPY postcss.config.js /app
COPY prettier.config.js /app
RUN yarn run build

# production environment
FROM nginx:1.23.1-alpine
WORKDIR /
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx
COPY nginx/vhost-nginx.conf /etc/nginx/conf.d
COPY docker-entrypoint.sh generate_config_js.sh /
COPY robots/robots.txt /usr/share/nginx/html/robots.txt

RUN chmod +x docker-entrypoint.sh generate_config_js.sh

EXPOSE 9005

ENTRYPOINT ["/docker-entrypoint.sh"]
