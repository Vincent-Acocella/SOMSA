FROM node:13.12.0-alpine

#Sets the directory for the files to be located in
WORKDIR /usr/src/app

#We need the depenedcies
COPY package*.json ./


#Download node
RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

# Gather all the files
COPY . .