var User = require('./models/user');

module.exports = function (app) {

    var posts = [
        {title: "first one", body: "just stuff"},
        {title: "post deux", body: "more stuff"}
    ];

    var users = [
        {username: "jimmy", password: "legs"},
        {username: "me", password: "ok"}
    ];

    app.get('/posts', function(req, res) {
        res.json(posts);
    });

    app.post('/posts', function(req, res) {
        posts.push(req.body);
        res.json(posts);
    });

    app.put('/posts/:id', function(req, res) {
        posts[req.params.id] = req.body;
        res.json(posts);
    });

    app.delete('/posts/:id', function(req, res) {
        posts.splice([req.params.id], 1);
        res.json(posts);
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

    app.post('/register', function(req, res) {
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
        })
    })

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};