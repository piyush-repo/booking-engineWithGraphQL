FROM node:12.21.0-alpine3.10

WORKDIR /app

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start"]