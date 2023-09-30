# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install app dependencies
RUN npm i -g nodemon
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose a port that the app will listen on
EXPOSE 3000

# Define the command to run the app
CMD [ "node", "index.js" ]
# CMD [ "nodemon", "index.js" ]