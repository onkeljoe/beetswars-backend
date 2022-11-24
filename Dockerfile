FROM node:16-alpine
WORKDIR /usr/app

# Install app dependencies
COPY package*.json .
COPY yarn.lock .
RUN yarn install

COPY . .

# for Typescript
RUN yarn build
# COPY files to dist, if needed
# COPY .env .
EXPOSE 4000
CMD node dist/index.js
