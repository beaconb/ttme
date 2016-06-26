var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  

var userSchema = mongoose.Schema({    
     token : String,     
     email: String,  
     hashed_password: String,    
     salt : String,  
     temp_str:String,
     lastLogin : Date,
 	 created : Date,
 	 favs : Array
});  

mongoose.connect('mongodb://localhost:27017/trastooo'); 
module.exports = mongoose.model('users', userSchema);