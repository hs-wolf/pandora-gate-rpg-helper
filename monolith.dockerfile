FROM node:lts-alpine as builder
USER root
RUN apk add --no-cache --virtual .gyp python3 make g++
RUN npm install nx -g

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN nx build monolith

FROM node:lts-alpine as prod

WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0

EXPOSE ${PORT}

ENV NODE_ENV production
ENV USE_DEFAULT_SERVICE_ACCOUNT true

COPY --from=builder ./app/dist/apps/monolith ./

RUN npm install tslib

RUN npm install --ci

CMD node ./main.js
