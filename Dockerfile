FROM node:18 as builder

# Create app directory
WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "npm", "start" ]