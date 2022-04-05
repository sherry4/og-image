FROM node:16-alpine
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN yarn
COPY . .
RUN yarn build
ENV PORT 3000
EXPOSE 3000
CMD node ./api/dist/index.js