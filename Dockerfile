FROM node:16

#ENV API_PORT $API_PORT
#ENV DB_USER $DB_USER
#ENV DB_HOST $DB_HOST
#ENV DB_DATABASE $DB_DATABASE
#ENV DB_PASSWORD $DB_PASSWORD
#ENV DB_PORT $DB_PORT
#ENV JWT_KEY $JWT_KEY
#ENV API_WEATHER_TOKEN $API_WEATHER_TOKEN
#ENV API_WEATHER_URL $API_WEATHER_URL

WORKDIR /api

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]