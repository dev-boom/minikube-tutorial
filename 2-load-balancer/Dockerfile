FROM node:11.6.0

RUN apt-get -y update
RUN apt-get -y install git wget sudo
RUN npm -g config set user root

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
