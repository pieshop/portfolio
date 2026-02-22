FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src/ src/

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost:3010/api/categories || exit 1

EXPOSE 3010

CMD ["node", "src/bin/www.js"]
