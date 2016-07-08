var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  

var categorySchema = mongoose.Schema({
	description: String,
    name: String,
    lang: String
});

module.exports = mongoose.model('categories', categorySchema);