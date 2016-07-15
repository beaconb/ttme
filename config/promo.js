var mongoose = require('mongoose'); 
var promo = require('../config/promoModel');   
var http = require('http');
var parseString = require('xml2js').parseString;

mongoose.set('debug', true);

exports.listPromos = function(callback){


return http.get({
        host: 'open.api.ebay.com',
        path: '/shopping?callname=FindPopularItems&responseencoding=JSON&appid=RaulGome-trastoo-PRD-b99eca255-d0ae6793&siteid=0&version=713&QueryKeywords=dog'
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
	        console.log("ConsoleLog: "+body);
		   	callback({body});
        });
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