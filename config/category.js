var mongoose = require('mongoose'); 
var categor = require('../config/categoryModel');   
//obtiene un listado de las categorias disponibles
exports.listCategories = function(callback){
	categor.find({}, function(err, docs) {
	console.log("listado categorias: ");
    if (!err){ 
    	console.log("resultado categorias: "+docs);
		callback({docs});
    } else {throw err;}
});
}
//Obtiene el detalle de una categoría concreta
exports.categoryDetail = function(idCat,callback){
	console.log("idCategoria que me llega: "+idCat);
	categor.findOne({_id: idCat}, function(err, doc) {
    if (!err){ 
    	console.log("resultado categorias: "+doc);
		callback({doc});
    } else {throw err;}
});
}
