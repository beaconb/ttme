var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  

var user2promoSchema = mongoose.Schema({    
    "read" : Boolean,
 	"user_id" : Schema.Types.ObjectId,
 	"promo_id" : Schema.Types.ObjectId
});  

module.exports = mongoose.model('user2promo', user2promoSchema);