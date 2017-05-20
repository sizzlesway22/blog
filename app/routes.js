var User = require('./models/user');
var Post = require('./models/post');

module.exports = function (app) {

    app.get('/posts', function(req, res) {
        Post.find({}, function(err, posts) {
            if (err) {
                res.json(err);
            } else {
                res.json(posts);
            }
        });
    });

    app.post('/posts', function(req, res) {
        var post = new Post({
            title: req.body.title,
            body: req.body.body
        });
        post.save(function(err, post) {
            if (err) {
                res.json(err);
            } else {
                res.json(post);
            }
        });
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
        User.findOne({email:req.body.email}, function(err, user) {
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
                    res.cookie('access_token', token);
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
                res.cookie('access_token', token);
                res.json(token);
            };
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};