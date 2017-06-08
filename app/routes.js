var User = require('./models/user');
var Post = require('./models/post');
var jwt = require('jsonwebtoken');

module.exports = function (app) {

    app.get('/posts', ensureAuthorized, function(req, res) {
        //TODO: Change the VERIFY method to be async
        var decoded = jwt.verify(req.token, process.env.TOKEN_SECRET);
        req.id = decoded._id;
        Post.find({author: req.id}, function(err, posts) {
            if (err) {
                res.json(err);
            } else {
                res.json(posts);
            }
        });
    });

    app.post('/posts', ensureAuthorized, function(req, res) {
        var post = new Post({
            title: req.body.title,
            body: req.body.body,
            author: req.userId
        });
        post.save(function(err, post) {
            if (err) {
                res.json(err);
            } else {
                res.json(post);
            }
        });
    });

    app.delete('/posts/:id', function(req, res, next) {
        Post.find({_id:req.params.id}).remove().exec();
        res.status(200);
    });

    app.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            if (err) {
                res.json(err);
            } else {
                res.json(users);
            }
        });
    });

    app.post('/login', function(req, res, next) {
        User.findOne({email:req.body.email})
        .populate('posts')
        .exec(function(err, user) {
            if (err) {
                res.json(err);
            };
            if (!user) {
                res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {
                if (!user.validPassword(req.body.password)) {
                    res.json({success: false, message: 'Authentication failed. Wrong password.'});
                } else {
                    var token = user.generateJwt();
                    res.json(token);
                };
            };
        });
    });

    app.post('/register', function(req, res, next) {
        var user = new User({
            email: req.body.email,
            name: req.body.name
        });
        user.setPassword(req.body.password);
        user.save(function(err, newUser) {
            if (err) {
                res.send(err)
            } else {
                var token = newUser.generateJwt();
                res.json(token);
            };
        });
    });

    function ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.send(403);
        }
    };

    app.get('/me', ensureAuthorized, function(req, res) {
        User.findOne({_id: req.userId}, function(err, user) {
            if (err) {
                res.json({
                    data: "Error occured: " + err
                });
            } else {
                res.json({
                    data: user
                });
            }
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};