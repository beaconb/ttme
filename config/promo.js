var mongoose = require('mongoose'); 
var promo = require('../config/promoModel');   
var http = require('http');
var parseString = require('xml2js').parseString;

mongoose.set('debug', true);

exports.listPromos = function(callback){

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'open.api.ebay.com',
  path: '/shopping?callname=FindPopularItems&responseencoding=XML&appid=RaulGome-trastoo-PRD-b99eca255-d0ae6793&siteid=0&version=713&QueryKeywords=dog'+''
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
    parseString(str, function (err, result) {
    console.dir(JSON.stringify(result));
	});
  });
}

http.request(options, callback).end();

/*
promo.find({}, function(err, docs) {
    if (!err){ 
		callback({docs});
    } else {throw err;}
});
*/
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