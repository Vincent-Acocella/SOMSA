FROM node:lts-alpine
 
# A directory within the virtualized Docker environment
WORKDIR /client/usr/src/app
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN npm install 
 
# Copies everything over to Docker environment
COPY . .