FROM node:17-alpine as dev
WORKDIR /api-gateway
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:17-alpine as prod
WORKDIR /api-gateway
COPY package*.json ./
RUN npm i --only=production
COPY . .
COPY --from=dev /api-gateway/dist ./dist
CMD ["npm", "run", "start:prod"]