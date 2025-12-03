# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if exists
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Expose the port your app listens on
EXPOSE 5000

# Start the app (production, not nodemon)
CMD ["node", "src/app.js"]

