FROM node:stretch-slim

RUN yarn global add pm2
RUN apk add --update python make g++\
    && rm -rf /var/cache/apk/*

RUN mkdir -p /api
WORKDIR /api

COPY . /api

RUN yarn install --frozen-lockfile --production
RUN yarn build

EXPOSE 80

CMD ["pm2", "start", "dist/index.js", "--no-daemon"]