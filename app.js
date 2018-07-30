const express = require('express'),
	  authRoute = require('./routes/auth-route'),
	  gPassportSetup = require('./config/google-auth'),
	  fPassportSetup = require('./config/facebook-auth'),
	  keys = require('./config/keys'),
	  mongoose = require('mongoose'),
	  cookieSession = require('cookie-session'),
	  passport = require('passport');


	const app = express();

//set view engine
app.set('view engine','ejs');

//mongodb conncetion
mongoose.connect(keys.mongodb.mongoURL,{ useNewUrlParser: true },()=>{
	console.log("database cannected");
});

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));


//initailize passport
app.use(passport.initialize());
app.use(passport.session());


//route setup
app.use('/auth',authRoute);


app.get('/',(req,res) =>{
	res.render('home');
})

app.listen(3000,()=>{
	console.log('Connected');
})