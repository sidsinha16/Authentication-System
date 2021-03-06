const router = require('express').Router(),
	  passport = require('passport');



//auth login
router.get('/login',(req,res)=>{
	res.render('login');
})

//auth logout
router.get('/logout',(req,res)=>{
	//handle with passport
	res.send('loggong out');
})

//auth with google
router.get('/google',passport.authenticate('google',{
	scope:['profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
	res.send("Logged In");
})

//auth with facebook
router.get('/facebook',passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  })




module.exports=router;