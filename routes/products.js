const app = require("express"),

    router = app.Router(),
    funs = require('../functions');


const { initialElements } = funs;

router.get('/list/all', (req, res) => {
    res.status(200).json({ name: "comming soon" })
});

router.get('/', (req, res) => {
    const elements = [...initialElements,

        "assets/css/store.min.css",
        "assets/lib/materialize/extras/noUiSlider/nouislider.css", "https://kit.fontawesome.com/5eaa28fea9.js",
        'assets/lib/materialize/extras/noUiSlider/nouislider.js',
        'assets/js/store.js'
    ]


    let title = funs.language('Products', funs.getAppCookies(req)['language']);
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);
    funs.globalCurrency(currency => {
        res.render('shop_home', {
            meta,
            elements,
            menu: true,
            lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
            _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
            language: funs.getAppCookies(req)['language'],
            languages: require("../language/languages.json"),
            renderImplimental: (_) => funs.renderImplimental(_),
            title,
            path: funs.pathToTheRoot(req._parsedUrl.path),
            currency,
            cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',
        })
    })

});
router.get('/search', (req, res) => {
    const elements = [...initialElements,

        "assets/css/shop.min.css",
        "assets/lib/materialize/extras/noUiSlider/nouislider.css", "https://kit.fontawesome.com/5eaa28fea9.js",
        'assets/lib/materialize/extras/noUiSlider/nouislider.js',
        'assets/js/shop.js'
    ]


    let title = funs.language('Products', funs.getAppCookies(req)['language']);
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);
    funs.globalCurrency(currency => {
        res.render('shop', {
            meta,
            elements,
            menu: true,
            lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
            _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
            language: funs.getAppCookies(req)['language'],
            languages: require("../language/languages.json"),
            renderImplimental: (_) => funs.renderImplimental(_),
            title,
            path: funs.pathToTheRoot(req._parsedUrl.path),
            currency,
            cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',
        })
    })

});
router.get('/main/:id', (req, res) => {

    require('../functions').destroy();
    require('../functions').con(require('../config/index').db.database, connect => {
        // var sql = "SELECT price,name, categorys.name AS category FROM products JOIN categorys ON products.category_id = categorys.id"
        var sql = "SELECT * FROM products JOIN offers ON products.name = offers.title WHERE products.product_id='" + req.params.id + "'"

        //  let products = [];
        connect.query(sql, (err, results) => {
            if (err) console.log(err);

            if (results && results.length) {

                //  for (let i = 0; i < results.length; i++) {
                let product = results[0];
                product.features = JSON.parse(product.features); /*  product.features.split('[').join('').split(']').join('').split(',') */
                product.specs = JSON.parse(product.specs);
                product.product_preview_imgs = JSON.parse(product.product_preview_imgs);
                if (product.data) {
                    product.offers = {
                        title: product.title,
                        sellingPrice: product.selling_price,
                        offersArray: JSON.parse(product.data)
                    };
                    delete product.title;
                    delete product.selling_price;
                    delete product.data;
                }
                //  products.push(product)

                const elements = [...initialElements,
                    "assets/css/shop.min.css",
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
                funs.globalCurrency(currency => {
                        res.render('product', {
                            meta,
                            elements,
                            menu: true,
                            lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
                            _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
                            language: funs.getAppCookies(req)['language'],
                            languages: require("../language/languages.json"),
                            renderImplimental: (_) => funs.renderImplimental(_),
                            title,
                            path: funs.pathToTheRoot(req._parsedUrl.path),
                            currency,
                            product,
                            formatMoney: (amount, decimalCount = 2, decimal = ".", thousands = ",") => funs.formatMoney(amount, decimalCount, decimal, thousands),
                            cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',
                        })
                    })
                    //  }
            }


        })


    });


});

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
        _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req._parsedUrl.path),
        cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',
    })
})

module.exports = router;