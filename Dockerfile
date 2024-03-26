FROM node

WORKDIR /usr/src/app

ARG NODE_ENV="production"
ENV NODE_ENV $NODE_ENV

COPY package*.json /usr/src/app/
RUN npm install --only=production

COPY . /usr/src/app

ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT
CMD [ "npm", "start" ]
