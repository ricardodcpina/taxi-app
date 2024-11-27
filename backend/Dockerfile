FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./docker-entrypoint.sh

RUN npm run build

EXPOSE 8080

CMD ["./docker-entrypoint.sh"]