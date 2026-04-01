# Etapa de construcción
FROM node:22-slim AS build
RUN mkdir -p /app
WORKDIR /app
COPY ["app-angular/package.json", "app-angular/package-lock.json", "/app/"]
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
COPY ["app-angular", "/app/"]
RUN npm run build -- --configuration production

# Etapa de producción con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/romaga /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]   