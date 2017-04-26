module.exports = function (app, passport) {

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

    app.post('/login',
        passport.authenticate('login'),
        function(req, res) {
            res.redirect('/loginSuccess');
        });

    app.post('/register',
        passport.authenticate('signup'),
        function(req, res) {
            res.redirect('/registerSuccess');
        });

    app.get('/registerSuccess', function(req, res, next) {
        res.send('Successfully registered');
    });

    app.get('/loginSuccess', function(req, res, next) {
        res.send('Successfully authenticated');
    });

    app.get('/users', function(req, res) {
        res.json(users);
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};