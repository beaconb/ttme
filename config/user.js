var mongoose = require('mongoose'); 
var user = require('../config/userModel');

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
exports.userDetail = function(userID, callback){
	user.findOne({ token: userID }, function (err, doc){
		callback({doc});
	});
};
exports.userUpdate = function(userID,name,surename,facebook,twitter,google, callback){

	user.findOne({ token: userID }, function (err, doc){
		var newuser = new user({   
			_id:doc._id, 
		    name:name,
		    surename:surename,
		    facebook:facebook,
		    twitter:twitter,
		    google:google,
		    token:userID,
		    active:true,
		    email:doc.email,
		    hashed_password:doc.hashed_password,
		    salt:doc.salt,
		    created:doc.created,
		    favs:doc.favs,
		    lastLogin:doc.lastLogin
	     }); 
		console.log("valores usuario: id: "+newuser._id+"- name:"+newuser.name+"- surename: "+newuser.surename+"- facebook: "+newuser.facebook+"- twitter: "
			+newuser.twitter+"- google: "+newuser.google+"- token: "+newuser.token+"- active: "+newuser.active+"- email: "+newuser.email+"- pwd: "
			+newuser.hashed_password+"- salt: "+newuser.salt+"- created: "+newuser.created+"- favs: "+newuser.favs+"- last: "+newuser.lastLogin);
//		 newuser.update();
		 doc.name = name;
		 doc.surename = surename;
		 doc.facebook = facebook;
		 doc.twitter = twitter;
		 doc.google = google;
		 doc.save();
		callback({doc});
	});
};