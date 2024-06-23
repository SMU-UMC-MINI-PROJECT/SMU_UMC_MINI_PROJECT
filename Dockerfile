FROM node:20.13.1

COPY package*.json ./

COPY . .

RUN npm install

# Puppeteer 의존성 설치
RUN apt-get update && apt-get install -y \
    chromium-browser \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*


# 앱 소스 복사
COPY . .
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

CMD ["npm", "start"]
