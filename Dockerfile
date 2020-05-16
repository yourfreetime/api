FROM node:stretch-slim

RUN yarn global add pm2
RUN apt-get update || : && apt-get install python -y

RUN mkdir -p /api
WORKDIR /api

COPY . /api

RUN yarn install --frozen-lockfile --production
RUN yarn build

EXPOSE 80

CMD ["pm2", "start", "dist/index.js", "--no-daemon"]