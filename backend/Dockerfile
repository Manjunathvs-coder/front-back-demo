FROM node:18-alpine

WORKDIR /app

COPY package.js ./

RUN npm ci --only=production

COPY . .

CMD ["node", "server.js"]