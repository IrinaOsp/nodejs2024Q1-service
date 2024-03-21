FROM node:20-alpine as build
WORKDIR /app
COPY *.json ./
RUN npm ci && npm cache clean --force
COPY . .

FROM node:20-alpine as main
WORKDIR /app
COPY --from=build /app /app
CMD ["npm", "run", "start:dev:docker"]