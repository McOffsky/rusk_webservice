FROM node:lts AS node-builder

WORKDIR /home/node/app
RUN npm i -g @nestjs/cli
COPY package*.json ./
RUN npm install

COPY . /home/node/app
RUN npm run build


FROM node:lts

WORKDIR /home/node/app
COPY --from=node-builder /home/node/app/dist ./
COPY --from=node-builder /home/node/app/node_modules ./node_modules

EXPOSE 3000
CMD ["node","main.js"]