var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  

var categorySchema = mongoose.Schema({
    name: String,
    description: String,
    lang: String
});

module.exports = mongoose.model('categories', categorySchema);