var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        console.log(req); 
        // check in mongo if a user with username exists or not
        User.findOne({ 'username' :  username }, 
        function(err, user) {
            // In case of any error, return using the done method
            if (err)
            return done(err);
            // Username does not exist, log error & redirect back
            if (!user){
            console.log('User Not Found with username '+username);
            return done(null, false);                 
            }
            // User exists but wrong password, log the error 
            if (!User.ValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false);
            }
            // User and password both match, return user from 
            // done method which will be treated like success
            return done(null, user);
        }
        );
    }));

    passport.use('signup', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        console.log(req);
        findOrCreateUser = function() {
        // find a user in Mongo with provided username
        User.findOne({'username':username}, function(err, user) {
            // In case of any error return
            if (err){
                console.log('Error in SignUp: '+err);
                return done(err);
            }
            // already exists
            if (user) {
                console.log('User already exists');
                return done(null, false);
            } else {
                // if there is no user with that email
                // create the user
                var newUser = new User();
                // set the user's local credentials
                newUser.username = username;
                newUser.password = User.generateHash(password);
        
                // save the user
                newUser.save(function(err) {
                    if (err) {
                        console.log('Error in Saving user: '+err);  
                        throw err;  
                    } else {
                        console.log('User Registration succesful');    
                        return done(null, newUser);
                    }
                });
            }
        });
        };
        
        // Delay the execution of findOrCreateUser and execute 
        // the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
    );
};