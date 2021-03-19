const express = require("express"),
    passport = require("passport"),
    { ensureAuthenticated, ensureUnAuthenticated } = require('../config/auth'),
    router = express.Router(),
    funs = require('../functions');


const { initialElements } = funs;

router.get("/login", ensureUnAuthenticated, (req, res) => {
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
        _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req.originalUrl),
        cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',

    });
});

router.post("/login", (req, res, next) => {
    passport.authenticate('local', { successRedirect: `/dashboard`, failureRedirect: './login', failureFlash: true })(req, res, next)
});

// logout handle
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You're logged out successfully")
    res.redirect("../users/login")

})

router.get("/forgot", ensureUnAuthenticated, (req, res) => {

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
        _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req.originalUrl),
        cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',

    });
});

router.use('/invoice', require('./invoice/'))

module.exports = router;