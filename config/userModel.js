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

module.exports = mongoose.model('users', userSchema);