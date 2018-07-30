const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	username : String,
	id : String,
	gender : String,	
	medium : String
});

var User = mongoose.model('user',userSchema);

module.exports = User;