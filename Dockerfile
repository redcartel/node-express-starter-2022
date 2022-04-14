FROM node:16-alpine as js-environment
WORKDIR /usr/app
COPY package*.json ./
COPY jsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD npm start