const express = require("express"),
    router = express.Router(),
    funs = require('../functions');


const { initialElements } = funs;
router.get("/main/:id", (req, res) => {
    let serviceName = req.params.id.replace('@', '');

    const elements = [...initialElements,
        "assets/css/services.min.css",
    ]



    let q = {};
    q['fields.slug'] = serviceName;

    funs.getFullCont.getService(q).then(data => {
        let services = data.items[0].fields;
        services['shortDescription'] = services.shortDescription.content[0].content[0].value;
        services['previewImage'] = services.previewImage.fields.file;

        let title = funs.language(services.name, funs.getAppCookies(req)['language']);

        const meta = funs.meta({
            title,
            description: funs.language(services.shortDescription, funs.getAppCookies(req)['language']),
            keywords: services.name,
            preview_image: services.previewImage.url,
            theme_color: "#fff"
        }, req);
        res.render("service", {
            meta,
            elements,
            menu: true,
            services,
            lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
            _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
            language: funs.getAppCookies(req)['language'],
            languages: require("../language/languages.json"),
            renderImplimental: (_) => funs.renderImplimental(_),
            title,
            path: funs.pathToTheRoot(req._parsedUrl.path),
            cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',

        })
    })


});

router.get("/@get-services", (req, res) => {
    const services = require('../data/services.json');

    res.status(200).json(services)
})
module.exports = router;