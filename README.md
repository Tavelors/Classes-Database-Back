# Classes-Database-Back

The repo for the frontend can be found here: 

https://github.com/Tavelors/Classes-Database-Front

## Built With

- mongoDB
- node js
- mongoose
- express
- express-async-handler
- jest/TDD
- colors
- jsonwebtoken
- cors
- bcryptjs

## Installation Instructions

To install and run tests locally:

- The server should be running on your machine locally.

**1. Install Project depencences**

```sh
npm i
```

**2. Create Databases**

- The project has a development database
- Create one at [Mongo](https://www.mongodb.com/)
- create a .env file and include:
 MONGO_URI = YOUR DATABASE
 JWT_SECRET = YOUR SECRET

**3. Start the server using nodemon**
in your .env file include: 
NODE_ENV = production
PORT = YOURPORTOFCHOICE
-type npm run server

