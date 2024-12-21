# # Base image
# FROM node:18

# # Set working directory
# WORKDIR /usr/fmms-nodejs

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the application's port (if applicable)
# EXPOSE 3000

# # Command to run the application
# CMD ["node", "index.js"]

# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the root directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire application code into the container
COPY . .

# Expose the application's port
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]

