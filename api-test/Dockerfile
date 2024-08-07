FROM node:18

WORKDIR /home/node/app
COPY ../api-test ./assignment-api

WORKDIR /home/node/app/assignment-api
RUN npm install 
RUN npx tsc  --build --clean
RUN npx tsc   

CMD node ./build/app.js