var mongoose = require('mongoose'); 
var categor = require('../config/categoryModel');   

exports.listCategories = function(callback){
	categor.find({}, function(err, docs) {
	console.log("listado categorias: ");
    if (!err){ 
    	console.log("resultado categorias: "+docs);
		callback({docs});
    } else {throw err;}
});
}
exports.categoryDetail = function(idCat,callback){
	categor.find({_id: idCat}, function(err, doc) {
    if (!err){ 
    	console.log("resultado categorias: "+doc);
		callback({doc});
    } else {throw err;}
});
}
