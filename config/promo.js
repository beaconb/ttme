var mongoose = require('mongoose'); 
var promo = require('../config/promoModel');   
mongoose.set('debug', true);
exports.listPromos = function(callback){
	promo.find({}, function(err, docs) {
    if (!err){ 
		callback({docs});
    } else {throw err;}
});
}
exports.addPromo = function(description,title,summary,publishedDate,fromDate,toDate,link,urlPhoto,urlPhotoMax,categories,providerID,callback){
	var newpromo = new promo({
	description : description,
	title : title,
	summary : summary,
	publishedDate : publishedDate,
	fromDate : fromDate,
	toDate : toDate,
	link : link,
	urlPhoto : urlPhoto,
	urlPhotoMax : urlPhotoMax,
	categoryID : categories,
	providerID : providerID	
	});
	newpromo.save(function (err) {  
		if (err){
			callback({'response':"Se ha producido un error:"+err}); 
		}
		else{ 
     		callback({'response':"Promo Sucessfully Added"});  
     	}

	}); 
}
exports.getPromos = function(ids,callback){
	promo.find({"_id":{$in:ids}},function(err,docs){
		callback({docs});
	});
}
exports.getPromo = function(id,callback){
	promo.findOne({_id:id},function(err,doc){
		callback({doc});
	});
}
exports.getPromosByCategory = function(idCat,callback){
	promo.find({categories:idCat},function(err,docs){
		console.log("REspuestas de promos por categorias: "+docs);
		callback({docs});
	});

}