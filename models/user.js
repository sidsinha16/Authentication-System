const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	username : String,
	googleId : String,
	gender : String	
});

var User = mongoose.model('user',userSchema);

module.exports = User;