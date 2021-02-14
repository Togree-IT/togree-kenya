const express = require("express"),
    router = express.Router(),
    funs = require('../functions');

const initialElements = ["assets/lib/materialize/css/icons.css", "assets/lib/materialize/css/materialize.min.css", "assets/css/globals.min.css", "//cdn.jsdelivr.net/npm/axios/dist/axios.min.js", ]

router.get("/main/:id", (req, res) => {
    let services = require('../data/services.json');
    services = services[req.params.id.replace('@', '')];
    // console.log(services);
    const elements = [...initialElements,
        "assets/css/services.min.css",
    ]

    let title = funs.language(services.name, funs.getAppCookies(req)['language']);

    const meta = funs.meta({
        title,
        description: funs.language(services.short_description, funs.getAppCookies(req)['language']),
        keywords: services.name,
        preview_image: services.preview_image,
        theme_color: "#fff"
    }, req);

    res.render("service", {
        meta,
        elements,
        menu: true,
        services,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req._parsedUrl.path),

    })
});

router.get("/@get-services", (req, res) => {
    const services = require('../data/services.json');

    res.status(200).json(services)
})
module.exports = router;