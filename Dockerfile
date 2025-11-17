# ---- builder ----
FROM node:24.11.0-alpine AS builder
WORKDIR /app

# 빌드 인자 선언 (기본값도 가능)
ARG VITE_API_BASE
ARG VITE_PROJECT_NAME

COPY package*.json ./
RUN npm ci

COPY . .

RUN if [ -n "${VITE_API_BASE}" ] || [ -n "${VITE_PROJECT_NAME}" ]; then \
      echo "VITE_API_BASE=${VITE_API_BASE}"        >  .env.production && \
      echo "VITE_PROJECT_NAME=${VITE_PROJECT_NAME}" >> .env.production ; \
    fi

RUN npm run build

# ---- runtime ----
FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
