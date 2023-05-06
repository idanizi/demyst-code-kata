FROM node:latest

WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Start the application
CMD ["pnpm", "start"]
