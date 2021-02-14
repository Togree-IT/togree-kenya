const { render } = require("ejs");

const app = require("express"),

    router = app.Router(),
    funs = require('../functions');
const initialElements = ["assets/lib/materialize/css/icons.css", "assets/lib/materialize/css/materialize.min.css", "assets/css/globals.min.css", "//cdn.jsdelivr.net/npm/axios/dist/axios.min.js", ]


router.get('/list/all', (req, res) => {
    res.status(200).json({ name: "comming soon" })
})
router.get('/', (req, res) => {
    const elements = [...initialElements,

        "assets/css/product.min.css",

        '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
        '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
        'assets/js/main.js',
        'assets/js/products.js'
    ]


    let title = funs.language('Products', funs.getAppCookies(req)['language']);
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);
    res.render('product', {
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
})

router.get('/checkout/:id', (req, res) => {

})
router.get('/checkout', (req, res) => {
    const elements = [...initialElements,
        "assets/css/checkout.min.css",
        "assets/js/checkout.js",

    ]

    let title = funs.language('Checkout', funs.getAppCookies(req)['language']);
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    res.render('checkout', {
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
})

module.exports = router;