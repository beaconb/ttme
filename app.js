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

require('./routes/routes.js')(app);  

app.listen(PORT);  

console.log('The App runs on port ' + PORT);


/*
var http = require('http');
var dispatcher = require('httpdispatcher');



function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.setStatic('resources');

//A sample GET request    	
dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});    

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});
*/
/*
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}
*/
/*var server = http.createServer(handleRequest);
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
*/