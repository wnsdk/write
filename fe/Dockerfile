FROM node:18.13-alpine as builder

# 작업 폴더를 만들고 npm 설치
WORKDIR /app
COPY package*.json /app/package.json

RUN npm install --force

# API 키를 위한 ARG 선언
ARG REACT_APP_OPENAI_API_KEY

# 환경 변수 설정
ENV REACT_APP_OPENAI_API_KEY=${REACT_APP_OPENAI_API_KEY}

# 소스를 작업폴더로 복사하고 빌드
COPY . /app
RUN npm run build -- --mode production

FROM nginx:alpine
# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# 위에서 생성한 앱의 빌드산출물을 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=builder /app/dist /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]
