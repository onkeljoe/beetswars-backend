FROM node:16

WORKDIR /usr/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

# for Typescript
RUN yarn build
# COPY files to dist, if needed
WORKDIR ./dist

expose 4000
CMD node index.js