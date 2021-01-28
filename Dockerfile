FROM node:12-stretch as build-stage

WORKDIR /app

RUN echo "Updating container"
RUN apt update
RUN apt upgrade -y

RUN echo "Installing vuejs as a global form"
RUN yarn global add @vue/cli

RUN echo "Copying the packages to container"
COPY package*.json ./

RUN echo "Installing npm packages"
RUN yarn install
# RUN echo "Updating packages"
# RUN yarn upgrade

RUN echo "Copying all of source to container"
COPY . .

RUN echo "Building the app"
RUN yarn run build

RUN echo "Start building server nginx"

FROM nginx:stable-alpine as production-stage

RUN echo "Copying settings file to container nginx"
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
