const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');

const initialElements = ["assets/lib/materialize/css/icons.css", "assets/lib/materialize/css/materialize.min.css", "assets/css/globals.min.css", "//cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    /* "assets/js/functions.js","assets/js/nav_.js ,,
       'assets/js/functions.js'" */
]

router.get("/", (req, res) => {

    const elements = [...initialElements, "//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css", "//unpkg.com/aos@2.3.1/dist/aos.css",
        "assets/css/style.css",
        'assets/lib/jquery/counter-up.js',
        'assets/js/main.js',
        'assets/js/home.js'
    ];

    let title = funs.language('Home', funs.getAppCookies(req)['language'])
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    res.render("home", {
        meta,
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req._parsedUrl.path),

    })
});

router.get("/about-us", (req, res) => {

    const elements = [...initialElements,
        "assets/css/about.css",
    ]

    let title = funs.language('about_us', funs.getAppCookies(req)['language']);
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
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
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

    let title = funs.language('Contact_us', funs.getAppCookies(req)['language']);
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
            lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
            language: funs.getAppCookies(req)['language'],
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