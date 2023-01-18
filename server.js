//import express 
const express = require('express');
//compose our paths to files 
const path = require('path');
//api routes
const api = require('./routes/index.js');

//use express for the app 
const app = express();
//creates port 
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


//creates paths for items in public folder 
app.use(express.static('public'));

//GET route for index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
