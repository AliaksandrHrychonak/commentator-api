FROM node:lts-alpine
LABEL maintainer "alexgrichenok@icloud.com"

WORKDIR /app
EXPOSE 3000

COPY package.json yarn.lock ./
RUN touch .env

RUN mkdir data
RUN set -x && yarn

COPY . .

CMD [ "yarn", "start:dev" ]
