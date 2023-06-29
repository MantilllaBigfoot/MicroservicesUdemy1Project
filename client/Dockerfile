# Base image
FROM node:alpine

#Bug from create react app
ENV CI=true
ENV WDS_SOCKET_PORT=0

#Every change from executing user is happening here
WORKDIR /app

# Dependencies
# COPY >FROM< >Container dir<
# First copy to cache all the dependencies
# so we can easily make changes to the index.js
COPY ./package.json ./
RUN npm install
COPY ./ ./


#Default command
CMD ["npm", "start"]