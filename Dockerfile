# Builder
FROM node:12.2.0-alpine as build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build datafeeder

# Runner
FROM nginx:1.16.0-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/datafeeder /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
