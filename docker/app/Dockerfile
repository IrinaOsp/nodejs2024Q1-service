FROM node:20-alpine

WORKDIR /app

COPY *.json ./

RUN npm ci && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:dev:docker"]

EXPOSE ${PORT}