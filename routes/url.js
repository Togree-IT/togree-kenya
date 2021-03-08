const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');


const { initialElements } = funs;

router.get("/external", (req, res) => {
    let link = req.query.url
    if (link.trim() !== '') {
        res.redirect(link)
    } else {
        // res.end()

        // req.destroy("Failed");
        // res.status(404).send("Your path is dead, you'll be redirected back");

        res.redirect(req.headers.referer)
    }
});

module.exports = router;