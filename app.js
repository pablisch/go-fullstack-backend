const express = require('express'); // import express module, to make our app an express server

const app = express(); // call the express function, which returns an object with a listen method



app.use((req, res, next) => {
  console.log('Request received'); // log a message to the console
  next(); // call the next method, to pass the request to the next middleware function in the stack
}); // call the use method, which adds a middleware function to the middleware stack

app.use((req, res, next) => { // call the use method, which adds a middleware function to the middleware stack
  res.status(201); // set the status code of the response
  next(); // call the next method, to pass the request to the next middleware function in the stack
}); 

app.use((req, res, next) => { // call the use method, which adds a middleware function to the middleware stack
  res.json({ message: 'Your request was successful!' }); // send a response with a json object
}); // call the use method, which adds a middleware function to the middleware stack

app.use((req, res, next) => { // call the use method, which adds a middleware function to the middleware stack
  console.log('Response sent successfully'); // log a message to the console
}); // call the use method, which adds a middleware function to the middleware stack

module.exports = app; // export the app object, so it can be used by other code, e.g. our tests