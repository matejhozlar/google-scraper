FROM node:20-alpine AS base
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

COPY package.json package-lock.json* ./ 

RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/" >/dev/null || exit 1

CMD ["node", "index.js"]
