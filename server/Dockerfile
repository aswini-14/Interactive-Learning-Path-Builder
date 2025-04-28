#Using the official Node.js image as a base image
FROM node:20

#Setting the working directory in the container
WORKDIR /usr/src/app

#Copying package.json and package-lock.json for npm install
COPY package*.json ./

#For Installing dependencies
RUN npm install

#Copy the rest of the application code
COPY . .

#Exposing the port the backend will run on
EXPOSE 5000

#the command to start the server
CMD ["npm", "start"]