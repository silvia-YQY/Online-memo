var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var jirenguStrategy = require('passport-jirengu').Strategy;


passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  console.log(obj)
  done(null, obj);
});


//饥人谷
passport.use(new jirenguStrategy({
    clientID: '447ee0531b6ecaf856c7e3ee5720b149b89d9e4c8a00fae5a841a9b006410681',
    tokenURL:'http://user.jirengu.com/oauth/token',
    clientSecret: '512cb20230f09ac1e741a9fde04dfee6b190f248fd8e9563333b560be163e30f',
    callbackURL: "http://localhost:3000/auth/jirengu/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

router.get('/jirengu',
  passport.authenticate('jirengu'));

router.get('/jirengu/callback',
  passport.authenticate('jirengu', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('jirengu咩呀：',req.user)
    req.session.user = {
      id: req.user._json.id,
      username: req.user._json.name,
      avatar: req.user._json.avatar, //标识图片
      provider: req.user.provider   //认证服务器
    };
    res.redirect('/');
  });


// GitHub  
passport.use(new GitHubStrategy({
    clientID: 'c8502783f3214f4a7beb',
    clientSecret: 'ddaad9bfc5f5297238ef70f66da2087cf0ecefb3',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
  }
));


router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('咩呀：',req.user)
    req.session.user = {
      id: req.user.id,
      username: req.user.displayName || req.user.username,
      avatar: req.user._json.avatar_url,
      provider: req.user.provider
    };
    res.redirect('/');
  });



module.exports = router;
