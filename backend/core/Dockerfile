FROM node:8-alpine
COPY . .
RUN npm ci --only=production
RUN export NODE_ENV=production
ENTRYPOINT [ "npm", "run", "start" ]