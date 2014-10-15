var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TradeSchema = new Schema({
	user: Number,
	items: Array
},
{
	collection: 'trade'
});

module.exports = mongoose.model('Trade',TradeSchema);