var User = require('./models/user');
var Post = require('./models/post');

module.exports = function (app) {

    app.get('/posts', function(req, res) {
        var me = req.headers.authorization;
        console.log('this is me: ' + me);
        Post.find({author:me})
        .exec(function(err, posts) {
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
            body: req.body.body,
            author: req.body.id
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
                    res.cookie('access_token', token);
                    res.json(user._id);
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
                res.json(newUser._id);
            };
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};