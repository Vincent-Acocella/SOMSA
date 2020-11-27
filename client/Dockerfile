# FROM node:current-alpine as build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install --silent

# COPY . .

# RUN npm run build

# FROM nginx
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80


# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:alpine
 
# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/client/app
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN npm install -g
 
# Copies everything over to Docker environment
COPY . .
