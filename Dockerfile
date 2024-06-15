FROM node:16-alpine3.13 as builder
RUN npm install -g gulp-cli
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN gulp build-clean

FROM nginx:1.20-alpine
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html/dist
COPY --from=builder /app/docs /usr/share/nginx/html/docs
COPY --from=builder /app/demo /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]
