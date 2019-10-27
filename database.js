const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');
const formidable = require('formidable');
const app = express();
const server = http.createServer(app);

// Load the SDK and UUID
var AWS = require('aws-sdk');
AWS.config.update({region: "us-west-2"})
// Initialize the Amazon Cognito credentials provider
// AWS.config.region = 'us-east-1'; // Region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:6a38f550-ce8a-4070-bea4-2c39d86d51e1',
// });

// const config = new AWS.Config({
//     // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: 'us-west-2'
//   })

var rekognition = new AWS.Rekognition();

// Server will always find an open port.
const port = process.env.PORT || 3001;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});

app.use(express.static(__dirname + '/public'));

// Needed to process body parameters for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Default endpoint 
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

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


// List of ingredients, pulled_idx, url
var ingredients = [];
var checked = [];
var newpath;
var pull_result = [];
var url_result = [];
var img_text = [];
var urgent5d = [];
var urgent5d_id = [];
var rec_id_dicts;
const all_ingre =  ['egg','milk','avocado','fish','beef','chicken','tofu','pork','beans','pepper','cauliflower',
'rice','cabbage','lettuce','carrot','onion','spinash','potato','tomato','broccoli'];
//array to stro recipes
var recipes_result = [];
var count_result = [];

// Create an S3 client
var s3 = new AWS.S3();


// Inserting an ice cream
app.post('/insertData', (req, res) => {
    const params = req.body;
    ingredients.push(params.ingred.toLowerCase());
    res.redirect('/');
});

app.post('/checkBox', (req, res) => {
    checked.push(req.body.ingredientChecked);
});

app.post('/insertImage', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      processImg(oldpath, res);
    });
    //res.redirect('/');
});

// Gets all the ice creams in the array
app.get('/getData', (req, res) => {
    res.send(ingredients.toString());
});

// Gets all the ice creams in the array
app.get('/getCheck', (req, res) => {
    res.send(checked.toString());
});

app.get('/generate', (req, res) => {
    pull_result = [];
    recipes_result = [];
    count_result = [];
    ingredients = ingredients.filter(onlyUnique);
    var str = '(';
    for (var i = 0; i < ingredients.length - 1; i++){
        str = str + '\"' + ingredients[i] + '\"' + ', ';
    }
    str = str + '\"' + ingredients[ingredients.length - 1] + '\"' + ")";
    var queryreq = 'select recipes.name, recipes.url, recipes.image, count(*) as freq from ingredients join pivot on pivot.ingredients_id = ingredients.id  join recipes on pivot.recipes_id = recipes.id where ingredients.name in ' + str + ' group by recipes.name, recipes.url, recipes.imageorder by freq desc ';

    con.query(queryreq, function(err, result, fields){
        if (err) throw err;
        for (var j of result){
            pull_result.push(j.recipes_id);
            recipes_result.push(j.name);
            count_result.push(j.freq);
        }
        console.log(recipes_result);
        res.send(recipes_result.toString());
    });
});

// TODO: Write a GET request to /count that checks iterates through 
//       the array and sends how many of a certain ice cream flavor 
//       exists to the response.
//       Use req.param.flavor to grab the flavor parameter.
app.get('/count', (req, res) => {
    res.send(urgent5d.toString());
});

app.get('/getRecipe', (req, res) => {
    var str = '(';
    for (var i = 0; i < pull_result.length - 1; i++){
        str = str + '\"' + pull_result[i] + '\"' + ', ';
    }
    str = str + '\"' + pull_result[pull_result.length - 1] + '\"' + ")";
    var urlreq = 'select * from recipes where recipes.id in ' + str;
    
    con.query(urlreq, function(err, result, fields){
        if (err) throw err;
        for (var j of result){
            //push to reciesp_result array
            url_result.push([j.url, j.image]);
        }
        console.log(recipes_result);
        res.send(url_result.toString());
    });  
});

// Read Checkbox @Dillon
function readCheckbox() {
    var ingredients = []
    var boxes = document.getElementsByName("ingredient-check");
    for (var i = 0; i<boxes.length; i++) {
        if(boxes[i].checked) {
            ingredients.push(boxes[i].value);
        }
    }
    console.log(ingredients);
    return ingredients;
}




function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function processImg(path, res){
    const params = {
        Image: {
            Bytes: fs.readFileSync(path)
        }
    };
    rekognition.detectText(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data); 
            for (var d of data.TextDetections){
                if (d.Type == "LINE"){
                    if (d.DetectedText.substr(d.DetectedText.length-1).match(/X/g)){
                        img_text.push(d.DetectedText.toLowerCase().split(" "));
                    }
                }
            }
            
        }            // successful response

        
        res.send(formatImgText());
    });


}

function formatImgText(){
    var formatted = [];
    for (var s of img_text){
        if (all_ingre.includes(s[0])){
            var dt;
            if (s[1].length == 6){
                dt = Date.parse('20' + s[1].substr(4,2) + "-" + s[1].substr(0,2) + "-" + s[1].substr(2,2));
            } else {
                dt = -1;
            }
            if (dt>0 && dt - Date.parse(new Date) < 432000000){
                urgent5d.push(s[0]);
            }
            
            formatted.push(s[0]);
        }
    }
    img_text = formatted;
    return img_text;
}


// rekognition.compareFaces(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });
// TODO: Write a GET request to /randomFlavor that sends a random 
//       flavor from our array to the response.

// Method that gets a random index from the iceCreams array
/*function getRandomNumber() {
    const num = Math.floor(Math.random() * ingredients.length);
    return num;
}*/