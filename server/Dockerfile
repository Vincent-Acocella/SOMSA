FROM node:13.12.0-alpine

#Sets the directory for the files to be located in
WORKDIR /usr/src/app

#We need the depenedcies
COPY package*.json ./

#Download node
RUN npm install

# Gather all the files
COPY . .
