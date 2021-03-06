// Requiring our models and passport as we've configured it
var db = require("../../models");
var passport = require("passport");

module.exports = function (app) {

    // Register a new user 
    app.post("/register", function (req, res) {
        console.log(req.body);
        const newUser = new db.User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        db.User.createUser(newUser, function (err, user) {
            if (err) throw err;
            res.send(user).end()
        })
    });

        // Endpoint to login
        app.post('/login',
            passport.authenticate('local'),
            function (req, res) {
                // console.log(req.body);
                res.send(req.user);
                // add send for rendering page when logged in
            }
        );

        // Endpoint to get current user
        app.get('/user', function (req, res) {
            res.send(req.user);
        })

        // Endpoint to logout
        app.get('/logout', function (req, res) {
            req.logout();
            res.json({ "Response": "User Logged Out" })
        });

    };