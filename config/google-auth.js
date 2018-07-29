const passport = require('passport'),
	  GoogleStrategy = require('passport-google-oauth20'),
	  keys = require('./keys'),
	  User = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});	  


passport.use(new GoogleStrategy({
	//option for google strat
	callbackURL  : '/auth/google/redirect',
	clientID : keys.google.clientID,
	clientSecret : keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
	console.log(profile.displayName);
	console.log(profile.gender);
	console.log(profile.id);

	User.findOne({googleId : profile.id}).then((user) => {
		if(user){
			console.log("User is " + user.username)
			done(null,user);
		}else{
			new User({
				username : profile.displayName,
				gender : profile.gender,
				googleId : profile.id
			}).save().then((data) => {
				console.log("New User => Name :: " + data.username+" is created");
				done(null,data);

			})
		 }
	  });
	})
);