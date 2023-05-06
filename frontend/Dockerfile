FROM node:latest AS build

WORKDIR /app

RUN npm i -g pnpm

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

RUN pnpm build

FROM nginx:latest

# Remove the default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/

# Copy the build output to the container
COPY --from=build /app/dist /usr/share/nginx/html

