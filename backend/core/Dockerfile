FROM node:8-alpine
COPY . .
RUN npm i --only=production
ENTRYPOINT [ "npm", "run", "start" ]