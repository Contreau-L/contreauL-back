# contreaul-api
This is an Express application using TypeScript.
This project allows the total management of contreaul data's and provides a set of routes
to fullfill the role of BFF (Back For Front).

## Prerequisites

- Node.js version 14 or higher
- NPM or Yarn

## Resources
- [API Meteo documentation](https://api.meteo-concept.com/documentation)
- [Express JS](https://expressjs.com/fr/)
- [Typescript](https://www.typescriptlang.org/)

## Documentation
- api-doc.yml : allow to obtain graphic documentation of the api. You have to put the content of the file 
in a swagger interpreter : https://editor.swagger.io/
- contreaul-api.postman_collection: postman collections to try all api routes. 
Use {{dev}} for development API on localhost:8080 and {{prod}} for production API.

## Installation

1. Clone the Git repository:
```bash
git clone https://github.com/Contreau-L/contreauL-back.git
```

2. Environment variables:

Create a .env file and fill it with the following variables and their values :
   - API_PORT 
   - DB_USER
   - DB_HOST
   - DB_DATABASE
   - DB_PASSWORD
   - DB_PORT
   - JWT_KEY
   - API_WEATHER_TOKEN
   - API_WEATHER_URL


3. Install dependencies:
```bash
npm install
```

4. Launch the application in development mode
```bash
npm run dev
```

5. Launch the application
```bash
npm run start
```

6. Build the application container
```bash
make up
```

