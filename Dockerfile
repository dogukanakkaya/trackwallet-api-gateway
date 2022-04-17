FROM node:17-alpine

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /api-gateway
COPY package*.json tsconfig.json ./

ARG NODE_ENV=prod
RUN if [ "${NODE_ENV}" = "prod" ] ; then npm i --only=production ; else npm i ; fi

COPY . .

EXPOSE 8080

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start:prod"]