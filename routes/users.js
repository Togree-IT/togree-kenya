const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');


const { initialElements } = funs;
router.get("/login", (req, res) => {

    const elements = [...initialElements,
        "assets/css/login.min.css",

    ]

    let title = funs.language('Login', funs.getAppCookies(req)['language']);
    const meta = funs.meta({
        title,
        description: "",
        keywords: 'Login, signup, Togree login, Togree signup, Register, Togree Register',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    res.render("login", {
        meta,
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req._parsedUrl.path),

    });
});

router.get("/forgot", (req, res) => {

    const elements = [...initialElements,
        "assets/css/login.min.css",

    ]

    let title = funs.language('Forgot', funs.getAppCookies(req)['language']);
    const meta = funs.meta({
        title,
        description: "",
        keywords: 'forgot, signup, Togree login, Togree signup, Register, Togree Register',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    res.render("forgot", {
        meta,
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req._parsedUrl.path),

    });
});


module.exports = router;