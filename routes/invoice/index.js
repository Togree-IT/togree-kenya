const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../../functions');
const { initialElements } = funs;

router.get("/generate", (req, res) => {
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
        _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req.originalUrl),
        cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',

    });

});

router.post("/send", (req, res) => {
    let email = req.body.Billing_to.email;
    funs.sendEmail('', 'Your Invoice from Togree', email, null, null, "invoice", [], {
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
        ...req.body
    }).then(done => {

        console.log(done);
        res.status(200).json({ status: 'successful' });
    }).catch(err => {
        res.status(500).json({ status: "failed" })
        console.log(err);
    });
});

module.exports = router;