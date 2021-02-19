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
router.get("/generate/invoice", (req, res) => {

    const elements = [...initialElements,
        "assets/css/invoice.min.css",

    ]

    let title = funs.language('Invoice Generator', funs.getAppCookies(req)['language']);
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    res.render("invoice_gen", {
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

router.post("/invoice/send", (req, res) => {
    console.log(req.body);
    res.status(200).json({ status: 'successful' })
})

module.exports = router;