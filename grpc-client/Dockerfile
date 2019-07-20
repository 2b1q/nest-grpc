FROM node:latest

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json ./
RUN npm install --quiet

# Bundle app source
COPY . ./