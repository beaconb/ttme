var mongoose = require('mongoose'); 
var user2promo = require('../config/user2promoModel');

exports.viewedPromo = function(promoID,userID,callback){
	
var newuser2promo = new user2promo({
	promo_id : promoID,
	user_id : userID
	});

	user2promo.find({promo_id: promoID,user_id:userID},function(err,promo){ 
	if ( promo.length == 0 ){
		newuser2promo.save(function (err) {  
		if (err){
			console.log("Voy mal");
			callback({'response':"Se ha producido un error:"+err}); 
		}
		else{ 
			console.log("Voy bien");
     		callback({'response':"Promo Sucessfully Added"});  
     	}
	});
	}else{
		callback({'response':"Promo Sucessfully Added"}); 
	}
});
	
/*
	newuser2promo.find(function (err) {  
		if (err){
			callback({'response':"Se ha producido un error:"+err}); 
		}
		else{ 
     		callback({'response':"Promo Sucessfully Added"});  
     	}
	});
*/
}