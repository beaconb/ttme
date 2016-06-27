var mongoose = require('mongoose'); 
var user = require('../config/userModel');
var promo = require('../config/promoModel');  

exports.favPromo = function(promoID,userID,callback){
	
	user.findOne({ token: userID }, function (err, doc){   
	  var arrayFav = doc.favs;
	  arrayFav.push(promoID);

	var novaArr = arrayFav.filter(function(este, i) {
    	return arrayFav.indexOf(este) == i;
	})

	  doc.favs = novaArr;
	  doc.save(function (err) {   

     callback({'response':"se ha añadido a favoritos"});  
	});
});
};
exports.unfavPromo = function(promoID,userID,callback){
	user.findOne({ token: userID }, function (err, doc){   
	  var arrayFav = doc.favs;
	  if ( arrayFav != null && arrayFav.length > 0 ){
	  	for ( var i=0; i < arrayFav.length; i++){
	  		if ( promoID == arrayFav[i] ){
	  			arrayFav.splice(i,1);
	  		}
	  	}
	  	doc.favs=arrayFav;
	  }else{
	  	callback({"response":"no hay ninguna promocion asociada"});
	  }
	  doc.save(function (err) {   

     callback({'response':"se ha eliminado de favoritos"});  
	});
	});
};
exports.listaFavs = function(userID,callback){
	user.findOne({ token: userID }, function (err, doc){
		 var arrayFav = doc.favs;
		callback({arrayFav});
	});
};