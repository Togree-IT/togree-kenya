const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');

const initialElements = ["assets/lib/materialize/css/icons.css", "assets/lib/materialize/css/materialize.min.css", "assets/css/globals.min.css", "//cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    /* "assets/js/functions.js","assets/js/nav_.js ,,
       'assets/js/functions.js'" */
]

router.get("/external", (req, res) => {
    let link = req.query.url
    if (link.trim() !== '') {
        res.redirect(link)
    } else {
        // res.end()
        console.log();
        // req.destroy("Failed");
        // res.status(404).send("Your path is dead, you'll be redirected back");

        res.redirect(req.headers.referer)
    }
});

module.exports = router;