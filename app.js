const express = require('express'); // import express module, to make our app an express server
const mongoose = require('mongoose'); // import mongoose module, to connect to MongoDB database
// mongoose is an ODM (Object Document Mapper) for MongoDB and Node.js. It allows us to interact with the MongoDB database in an object-oriented way. It provides a schema-based solution to model our application data with MongoDB. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
const { password }  = require('./config'); // import the password property of the object exported from config.js
// the password in config.js is the password for the user pablojoyce, which has read and write access to the database

const Thing = require('./models/thing'); // import the Thing model, which is exported from thing.js

const app = express(); // call the express function, which returns an object with a listen method

mongoose.connect(`mongodb+srv://pablojoyce:${password}@gofullstack.se9tvhr.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => { // call the then method, which adds a callback function to the promise, to handle the success case
    console.log('Successfully connected to MongoDB Atlas!'); // log a message to the console
  })
  .catch((error) => { // call the catch method, which adds a callback function to the promise, to handle the failure case
    console.log('Unable to connect to MongoDB Atlas!'); // log a message to the console
    console.error(error); // log the error to the console
  });
  
app.use(express.json()); // call the use method, which adds a middleware function to the middleware stack, to parse the request body
// express.json() intercepts every request with json data content type, take the request  body and put it onto the request object as the body property.

// The following code is executed for every incoming request
// The three res.setHeader() methods set the response headers which allow the client to access the API and deal with the CORS policy. Cross Origin Resource Sharing (CORS) is a security mechanism which restricts HTTP requests made from scripts to resources in a different origin. An origin is a combination of a protocol, a domain name and a port number. For example, http://localhost:3000 is an origin. The CORS policy is enforced by the browser. The browser sends an OPTIONS request to the server, to check if the client is allowed to access the API. The server responds with the Access-Control-Allow-Origin header, which tells the browser if the client is allowed to access the API. If the client is allowed to access the API, the browser sends the actual request. The server responds with the requested data. If the client is not allowed to access the API, the browser does not send the actual request. Instead, it sends an error message to the console.
app.use((req, res, next) => { // call the use method, which adds a middleware function to the middleware stack
  // set the response header to allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  // set the response header to allow the following headers
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // set the response header to allow the following methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // call the next function which will be executed in the middleware stack
  next();
});

app.post('/api/stuff', (req, res, next) => { // call the post method, which adds a route to the app object, to handle POST requests to the /api/stuff endpoint
  const thing = new Thing({ // create a new Thing object, using the Thing model
    title: req.body.title, // set the title property of the Thing object to the title property of the request body
    description: req.body.description, // set the description property of the Thing object to the description property of the request body
    imageUrl: req.body.imageUrl, // set the imageUrl property of the Thing object to the imageUrl property of the request body
    price: req.body.price, // set the price property of the Thing object to the price property of the request body
    userId: req.body.userId, // set the userId property of the Thing object to the userId property of the request body
  }); // end of const thing = new Thing({ ... })
  thing.save() // call the save method, which saves the Thing object to the database
    .then(() => res.status(201).json({ message: 'Thing saved successfully!' })) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}); // end of app.post('/api/stuff', (req, res, next) => { ... })  

app.get('/api/stuff/:id', (req, res, next) => { // call the get method, which adds a route to the app object, to handle GET requests to the /api/stuff/:id endpoint
  Thing.findOne({ _id: req.params.id }) // call the findOne method, which returns a promise, which resolves to the Thing object with the specified id
    .then(thing => res.status(200).json(thing)) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(404).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}); // end of app.get('/api/stuff/:id', (req, res, next) => { ... })

app.put('/api/stuff/:id', (req, res, next) => { // call the put method, which adds a route to the app object, to handle PUT requests to the /api/stuff/:id endpoint
  const thing = new Thing({ // create a new Thing object, using the Thing model
    _id: req.params.id, // set the _id property of the Thing object to the id property of the request parameters
    title: req.body.title, // set the title property of the Thing object to the title property of the request body
    description: req.body.description, // set the description property of the Thing object to the description property of the request body
    imageUrl: req.body.imageUrl, // set the imageUrl property of the Thing object to the imageUrl property of the request body
    price: req.body.price, // set the price property of the Thing object to the price property of the request body
    userId: req.body.userId, // set the userId property of the Thing object to the userId property of the request body
  }); // end of const thing = new Thing({ ... })
  Thing.updateOne({ _id: req.params.id }, thing) // call the updateOne method, which returns a promise, which resolves to the Thing object with the specified id
    .then(() => res.status(201).json({ message: 'Thing updated successfully!' })) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}); // end of app.put('/api/stuff/:id', (req, res, next) => { ... })

app.delete('/api/stuff/:id', (req, res, next) => { // call the delete method, which adds a route to the app object, to handle DELETE requests to the /api/stuff/:id endpoint
  Thing.deleteOne({ _id: req.params.id }) // call the deleteOne method, which returns a promise, which resolves to the Thing object with the specified id
    .then(() => res.status(200).json({ message: 'Deleted!' })) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}); // end of app.delete('/api/stuff/:id', (req, res, next) => { ... })

app.get('/api/stuff', (req, res, next) => { // call the get method, which adds a route to the app object, to handle GET requests to the /api/stuff endpoint
  Thing.find() // call the find method, which returns a promise, which resolves to an array of all the Thing objects in the database
    .then(things => res.status(200).json(things)) // call the then method, which adds a callback function to the promise, to handle the success case
    .catch(error => res.status(400).json({ error: error })); // call the catch method, which adds a callback function to the promise, to handle the failure case
}); // end of app.get('/api/stuff', (req, res, next) => { ... })

module.exports = app; // export the app object, so it can be used by other code, e.g. our tests