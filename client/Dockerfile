#Using the official Node.js image as a base image
FROM node:20

#Setting the working directory inside the container
WORKDIR /app

#Copying package.json and package-lock.json for npm install
COPY package*.json ./

#Installing dependencies
RUN npm install

#Copy the rest of the application code
COPY . .

#Build the React app for production
RUN npm run build

#Serve the app using a simple server
RUN npm install -g serve

#Expose the port the app will run on
EXPOSE 5001

#Command to run the app using `serve`
CMD ["serve", "-s", "build"]
