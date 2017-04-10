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

    app.post('/login', function(req, res) {
        var user = users.indexOf(req.body.username);
        if (user >= 0) {
            if (users[user].password == req.body.password) {
                res.json(users);
            } else {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            };
        } else {
            res.json({ success: false, message: 'It fucked up' });
        };
    });

    app.post('/register', function(req, res) {
        res.json({ success: false, message: 'Hold on to your butts' });
    });

    app.get('/users', function(req, res) {
        res.json(users);
    })

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};