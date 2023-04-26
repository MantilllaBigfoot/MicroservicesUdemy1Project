# Base image
FROM node:alpine

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