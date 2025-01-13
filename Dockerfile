# Use an official Node.js runtime as a parent image
FROM node:18

# Install PM2 globally
RUN npm install -g pm2

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app using PM2
CMD ["pm2-runtime", "start", "app.js"]
