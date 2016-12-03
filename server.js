var express = require('express'),
    routes = require('./app/routes/index.js');
var app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fcc_image_search');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongoose is alive !");
});

routes(app, db);

app.listen(3000, function () {
  console.log('I am listening on port 3000!')
});
