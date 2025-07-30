# Étape 1 : build TypeScript
FROM node:18 AS builder
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

# Étape 2 : exécution avec uniquement le JS compilé
FROM node:18
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --omit=dev

CMD ["node", "dist/index.js"]
