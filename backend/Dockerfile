FROM node:20.17

RUN mkdir -p /app/backend

RUN mkdir -p /app/database

COPY . /app/backend

WORKDIR /app/backend

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
