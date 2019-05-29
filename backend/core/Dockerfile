FROM node:alpine-8
COPY . .
RUN npm ci --only=production
ENTRYPOINT [ "npm", "run", "start" ]