var mongoose = require('mongoose'); 
var provider = require('../config/providerModel');   
//obtiene un listado de los proveedores integrados
exports.listProviders = function(callback){
	provider.find({}, function(err, docs) {
	console.log("listado providers: ");
    if (!err){ 
    	console.log("resultado providers: "+docs);
		callback({docs});
    } else {throw err;}
});
}
//Obtiene el detalle de un provider concreto
exports.providerDetail = function(idProvider,callback){
	console.log("idProveedor que me llega: "+idProvider);
	provider.findOne({_id: idProvider}, function(err, doc) {
    if (!err){ 
    	console.log("resultado providers: "+doc);
		callback({doc});
    } else {throw err;}
});
}
