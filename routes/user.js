const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');
const initialElements = ["assets/css/style.css",

]
router.get("/login", (req, res) => {

    const elements = [...initialElements,
        "assets/css/art.css",
        'assets/js/initial.js',
        'assets/js/art.js',
        'assets/js/main.js'
    ]
    res.render("login", {
        elements,
        menu: !true,
        title: "Login",
        path: funs.pathToTheRoot(req._parsedUrl.path),

    })
});
router.get("/forgot", (req, res) => {

    const elements = [...initialElements,
        "assets/css/art.css",
        'assets/js/initial.js',
        'assets/js/art.js',
        'assets/js/main.js'
    ]
    res.render("forgot", {
        elements,
        menu: !true,
        title: "Forgot",
        path: funs.pathToTheRoot(req._parsedUrl.path),

    })
});


module.exports = router;