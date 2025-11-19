# 1단계: 빌드 (Node)
FROM node:22-alpine AS builder

WORKDIR /app

# package.json / lock만 먼저 복사해서 캐시 최대 활용
COPY package*.json ./
RUN npm ci

# 나머지 소스 복사
COPY . .

# .env는 Jenkins 파이프라인에서 생성해줌
RUN npm run build

# 2단계: 배포 (Nginx)
FROM nginx:1.27-alpine

# nginx.conf는 프로젝트 안 deploy/nginx.conf 사용한다고 가정
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
