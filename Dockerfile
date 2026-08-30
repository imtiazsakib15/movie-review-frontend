FROM node:22-alpine

WORKDIR /app

# 1. Copy both package files together
COPY package.json package-lock.json ./

# 2. Install ALL dependencies (including devDependencies needed for generate/build)
RUN npm ci

# 3. Copy the rest of the application source code
COPY . .

EXPOSE 3000

# 4. Use optimized production execution commands
CMD ["sh", "-c", "npm run generate --if-present && npm run dev"]
