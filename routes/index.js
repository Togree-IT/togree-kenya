const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');

const { initialElements } = funs;

router.get("/", (req, res) => {

    const elements = [...initialElements, "//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css", "//unpkg.com/aos@2.3.1/dist/aos.css",
        "assets/css/style.min.css",
        'assets/lib/jquery/counter-up.js',
        'assets/js/main.min.js',
        'assets/js/home.min.js'
    ];

    let title = funs.language('Home', funs.getAppCookies(req)['language'] || 'en')
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    funs.getFullCont.getOurNumbers().then(data => {

        let our_numbers = data.items.map(fields => fields.fields);
        res.render("home", {
            meta,
            elements,
            menu: true,
            lang_: _ => funs.language(_, funs.getAppCookies(req)['language'] || 'en'),
            _language: require("../language/" + funs.getAppCookies(req)['language'] || 'en' + ".json"),
            language: funs.getAppCookies(req)['language'] || 'en',
            languages: require("../language/languages.json"),
            renderImplimental: (_) => funs.renderImplimental(_),
            title,
            our_numbers,
            path: funs.pathToTheRoot(req._parsedUrl.path),

        })
    })


});

router.get("/about-us", (req, res) => {

    const elements = [...initialElements,
        "assets/css/about.css",
    ]

    let title = funs.language('about_us', funs.getAppCookies(req)['language'] || 'en');
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    res.render("about_us", {
        meta,
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language'] || 'en'),
        _language: require("../language/" + funs.getAppCookies(req)['language'] || 'en' + ".json"),
        language: funs.getAppCookies(req)['language'] || 'en',
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req._parsedUrl.path),

    })
});
router.get("/contact-us", (req, res) => {

    const elements = [...initialElements,
        "assets/css/contact.min.css",

    ]

    let title = funs.language('Contact_us', funs.getAppCookies(req)['language'] || 'en');
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);
    funs.getFullCont.getAddress().then(data => {
        // console.log(data.items);
        res.render("contact-us", {
            meta,
            address: data.items[0].fields,
            elements,
            menu: true,
            lang_: _ => funs.language(_, funs.getAppCookies(req)['language'] || 'en'),
            _language: require("../language/" + funs.getAppCookies(req)['language'] || 'en' + ".json"),
            language: funs.getAppCookies(req)['language'] || 'en',
            languages: require("../language/languages.json"),
            renderImplimental: (_) => funs.renderImplimental(_),
            title,
            path: funs.pathToTheRoot(req._parsedUrl.path),

        })
    });

});


// lang_("Faanck Link")
// console.log(lang_("home_title"));
module.exports = router;