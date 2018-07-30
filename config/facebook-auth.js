const passport = require('passport'),
	  FacebookStrategy = require('passport-facebook').Strategy,
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

passport.use(new FacebookStrategy({
    clientID: keys.facebook.app_id,
    clientSecret: keys.facebook.app_secret,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log(profile.id);
  	User.findOne({id:profile.id}).then((user)=>{
  		if(user){
  			console.log("User Name : " +profile.displayName + " existed")
				done(null,user);
  		} else{
  			new User({
  				username : profile.displayName,
				gender : profile.gender,
				id : profile.id,
				medium : profile.provider
  			}).save().then((data)=>{
  				console.log("New User => Name :: " + data.username+" is created");
				done(null,data);
  			})
  		}
  	})
  }
));