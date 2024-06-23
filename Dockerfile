FROM node:20.13.1

COPY package*.json ./

COPY . .

RUN npm install

RUN sudo apt-get install -y chromium-browser
CMD ["npm", "start"]
