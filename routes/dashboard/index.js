const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    { ensureAuthenticated, ensureUnAuthenticated } = require('../../config/auth'),
    funs = require('../../functions');

const { initialElements } = funs;


router.get("/", ensureAuthenticated, (req, res) => {
    const elements = [...initialElements,
        "assets/css/dashboard.min.css",
    ];

    console.log(req.isAuthenticated());

    let title = funs.language('Dashboard', funs.getAppCookies(req)['language']);
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    res.render("dashboard/index", {
        meta,
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        _language: require("../../language/" + funs.getAppCookies(req)['language'] + ".json"),
        language: funs.getAppCookies(req)['language'],
        languages: require("../../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req.originalUrl),
        cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',

    });
});
module.exports = router;