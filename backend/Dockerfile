# Use an official Node.js runtime
FROM node:18-alpine

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all source code
COPY . .

# Expose the port and start
EXPOSE 3000
CMD ["npm", "start"]
