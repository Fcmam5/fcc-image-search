var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var querySchema = new Schema({
   query: String,
   timestamp: String
});

module.exports = mongoose.model('QueryData', querySchema);
