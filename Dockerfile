FROM node:16-alpine

WORKDIR /user/src/app

COPY package*.json .

RUN npm install

COPY . . 

RUN npm run build

CMD ["node", "dist/app.js"]