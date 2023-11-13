
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN mv /app/.env.example /app/.env
COPY /app/.env /app/server/.env

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
