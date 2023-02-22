FROM node:14-alpine
WORKDIR /usr/src/app
COPY src .
RUN npm i
CMD [ "npm", "start" ]
