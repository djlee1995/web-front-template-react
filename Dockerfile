# Stage: Deploy with Nginx (ultra-fast)
FROM nginx:1.27-alpine

# Custom nginx config
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files (Jenkins에서 이미 dist 생성)
COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]