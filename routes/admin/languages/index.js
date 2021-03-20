const express = require("express"),
    router = express.Router(),
    { ensureAuthenticated, ensureUnAuthenticated } = require('../../../config/auth'),
    funs = require('../../../functions');


let { initialElements } = funs;
initialElements = [...initialElements, "assets/css/admin/languages/style.min.css", ];
router.get("/createlanguage", (req, res) => {

    // let adminName = req.params.id.replace('@', '');
    const elements = [...initialElements, "assets/css/admin/languages/create.min.css", ]

    res.render('admin/languages/create', {
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../../../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title: "Create Language",
        path: funs.pathToTheRoot(req.originalUrl),

    })
});

module.exports = router;