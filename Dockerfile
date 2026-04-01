# Etapa de construcción
FROM node:22-slim AS build
WORKDIR /app
COPY app-angular/ .
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
RUN npm run build -- --configuration production

# Etapa de producción con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/romaga /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]   