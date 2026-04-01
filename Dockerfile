FROM node:22-slim
RUN mkdir -p /app
WORKDIR /app
COPY ["app-angular/package.json", "app-angular/package-lock.json", "/app/"]
COPY ["app-angular", "/app/"]
RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install
CMD ["npm", "run", "start"]   