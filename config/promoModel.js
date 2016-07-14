var mongoose = require('mongoose');  
var Schema = mongoose.Schema;  

var promoSchema = mongoose.Schema({
	description: String,
    title: String,
    summary: String,
    publishedDate: Date,
    fromDate: Date,
    toDate: Date,
    link: String,
    urlPhoto: String,
    urlPhotoMax:String,
    price:String,
    originalPrice: String,
    save: String,
    categories: Array,
    providerID: Schema.Types.ObjectId
});

module.exports = mongoose.model('promos', promoSchema);