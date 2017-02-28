module.exports = function (app) {

    var posts = [
        {title: "first one", body: "just stuff"},
        {title: "post deux", body: "more stuff"}
        ];

    app.get('/posts', function(req, res) {
        res.json(posts);
    });

    app.post('/posts', function(req, res) {
        posts.push(req.body);
        res.json(posts);
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '../public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};