var express = require('express');
var app = express();
var connect = require('connect');
var stormpath = require('express-stormpath')
const PORT= process.env.PORT || 2007; 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/trastooo'); 

// Configuration 
app.use(express.static(__dirname + '/public')); 
app.use(connect.logger('dev')); 
app.use(connect.json()); 
app.use(connect.urlencoded());  

// Routes  

app.set('view engine', 'ejs');

require('./routes/routes.js')(app);  

app.listen(PORT);  

console.log('The App runs on port ' + PORT);