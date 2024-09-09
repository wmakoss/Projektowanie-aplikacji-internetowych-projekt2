FROM node:20.17

RUN mkdir -p /app/frontend

COPY . /app/frontend

WORKDIR /app/frontend

RUN npm install

EXPOSE 80

ENTRYPOINT ["npm", "start"]
