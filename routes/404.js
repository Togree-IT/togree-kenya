const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');

const initialElements = ["assets/lib/materialize/css/icons.css", "assets/lib/materialize/css/materialize.min.css", "assets/css/globals.min.css", "//cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    /* "assets/js/functions.js","assets/js/nav_.js ,,
       'assets/js/functions.js'" */
]

router.get("/external", (req, res) => {
    let link = req.query.url;
    // console.log((link === ''));
    if (link.trim() !== '') {
        res.redirect(link)
    } else {
        // res.end()
        // console.log(link);
        req.destroy(500)
    }
});

module.exports = router;