FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 4 && \
    npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]