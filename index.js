// set up ======================================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
//var passport = require('passport');
var session = require('express-session');
var port = process.env.PORT || 7001;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var sass = require('express-sass-middleware');

// configuration ===============================================================
mongoose.connect(database.localUrl);

app.get('/css/styles.css', sass({
    file: './sass/styles.sass',
    precompile: true,
    indentedSyntax: true,
}));
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// passport ====================================================================
/*app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));*/
//app.use(passport.initialize());
//app.use(passport.session());
//app.set('superSecret', process.env.TOKEN_SECRET);
//require('./config/passport')(passport);

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);