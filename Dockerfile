# 공식 Node.js 이미지를 베이스 이미지로 사용
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 앱 의존성 설치
COPY package*.json ./
RUN npm install

# 필요한 패키지 설치 및 Google Chrome 설치
# RUN apt-get update && \
#     apt-get install -y wget gnupg --no-install-recommends && \
#     wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
#     apt-get install -y ./google-chrome-stable_current_amd64.deb && \
#     rm google-chrome-stable_current_amd64.deb && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*
   
RUN apt-get update && apt-get install -y sudo
#apt-get update 명령어를 실행하여 패키지 목록을 업데이트하고, sudo 패키지를 설치합니다.

RUN apt install sudo
#이미 설치된 패키지를 확인하고, 필요한 경우 sudo 패키지를 추가로 설치합니다.

RUN /bin/sh -c su -c 'amazon-linux-extras install epel -y'
RUN apt-get install chromium -y
#공식문서에서의 설치 명령어

# # 설치 확인
# RUN google-chrome --version

# 앱 소스 복사
COPY . .

# 환경 변수 설정 (Puppeteer가 Chrome 경로를 찾을 수 있도록)
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

# 빌드 실행
RUN npm run build --if-present

# 앱 실행
CMD ["npm", "start"]
