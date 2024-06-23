# 공식 Node.js 이미지를 베이스 이미지로 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 필요한 패키지 설치 및 Google Chrome 설치
RUN apt-get update && \
    apt-get install -y wget gnupg --no-install-recommends && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb && \
    rm google-chrome-stable_current_amd64.deb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 설치 확인
RUN google-chrome --version

# 앱 소스 복사
COPY . .

# 환경 변수 설정 (Puppeteer가 Chrome 경로를 찾을 수 있도록)
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# 빌드 실행
RUN npm run build --if-present

# 앱 실행
CMD ["npm", "start"]
