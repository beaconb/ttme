var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  

var providerSchema = mongoose.Schema({
	name: String,
    appId: String,
    devId: String,
    certId: String,
    username: String,
    falta: Date
});

module.exports = mongoose.model('providers', providerSchema);