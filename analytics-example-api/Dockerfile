FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV DB_HOST=mongo
CMD npm run start