const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const app = express();
const server = http.createServer(app);

// Server will always find an open port.
const port = process.env.PORT || 3001;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});

// Needed to process body parameters for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Default endpoint 
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
/*
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "recipes-ca.czmmtifous4d.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "MY9TFk8xvKt37dslRotD",
    database: "recipes"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

// List of ice cream flavors
const ingredients = [];

// Inserting an ice cream
app.post('/insertData', (req, res) => {
    const params = req.body;
    ingredients.push(params.flavor);
    res.redirect('/');
});

app.post('/insertImage', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var filePath = files.filetoupload.path;
      res.write('File uploaded');
      res.end();
    });
    res.redirect('/');
});

// Gets all the ice creams in the array
app.get('/getData', (req, res) => {
    res.send(ingredients.toString());
});

// TODO: Write a GET request to /count that checks iterates through 
//       the array and sends how many of a certain ice cream flavor 
//       exists to the response.
//       Use req.param.flavor to grab the flavor parameter.
app.get('/count', (req, res) => {
    const flavor = req.query.flavor;
    let count = 0;
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i] == flavor) {
            count++;
        }
    }
    res.json(count);
});



// TODO: Write a GET request to /randomFlavor that sends a random 
//       flavor from our array to the response.

// Method that gets a random index from the iceCreams array
function getRandomNumber() {
    const num = Math.floor(Math.random() * ingredients.length);
    return num;
}