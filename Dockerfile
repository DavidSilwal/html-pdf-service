FROM library/node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install required packages
RUN apt-get install -y curl git 

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm install -g forever

# Copy source code
COPY . /usr/src/app/
RUN sed -i "s/app.set('port', 8080);/app.set('port', 80);/g" /usr/src/app/app.js

EXPOSE 80
CMD [ "forever", "app.js" ]


