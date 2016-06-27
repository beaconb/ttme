var mongoose = require('mongoose'); 
var user2promo = require('../config/user2promoModel');

exports.viewedPromo = function(promoID,userID,callback){
	
var newuser2promo = new user2promo({
	promo_id : promoID,
	user_id : userID,
	read : true
	});
	newuser2promo.save(function (err) {  
		if (err){
			callback({'response':"Se ha producido un error:"+err}); 
		}
		else{ 
     		callback({'response':"Promo Sucessfully Added"});  
     	}

	}); 
};