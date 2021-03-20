const express = require("express"),
    router = express.Router(),
    { ensureAuthenticated, ensureUnAuthenticated } = require('../../config/auth'),
    funs = require('../../functions');


const { initialElements } = funs;


router.get("/", ensureAuthenticated, (req, res) => {
    const elements = [...initialElements,
        'assets/css/editor.css',
        'assets/lib/idb/lib/idb.js',
        'assets/js/idbHelper/index.js',
        'assets/js/admin/orders.js',
        'assets/data/order.json',
        'https://cdn.lineicons.com/2.0/LineIcons.css',
        'assets/js/admin/admin.js',
        "https://kit.fontawesome.com/5eaa28fea9.js",
    ];

    let orders = 'orders';

    res.render('admin/' + orders, {
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title: "admin",
        path: funs.pathToTheRoot(req.originalUrl),
        active: orders,
        // draftData,
    });
});

router.get("/:orders", ensureAuthenticated, (req, res) => {

    const elements = [...initialElements,
        'assets/css/editor.css',
        'assets/lib/idb/lib/idb.js',
        'assets/js/idbHelper/index.js',
        'assets/js/admin/orders.js',
        'assets/data/order.json',
        'https://cdn.lineicons.com/2.0/LineIcons.css',
        'assets/js/admin/admin.js',
        "https://kit.fontawesome.com/5eaa28fea9.js",
    ];

    let orders = req.params.orders === '' ? 'orders' : req.params.orders;
    let draftData = {};
    let blogData = {};
    let languageData = {};

    if (req.params.orders === 'createblog') {
        draftData = require('../draft.json') || {};
        elements.push(
            'assets/js/admin/createBlog.js',
            'assets/lib/editor/editor.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/header@2.6.1/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/link@2.3.1/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/embed@2/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/quote@2.4.0/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/marker@1.2.2/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/code@2.6.0/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/list@1.6.2/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/delimiter@1.2.0/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/image@2.6.0/dist/bundle.min.js', );
    }
    if (req.params.orders === 'languages') {
        languageData = require("../../language/languages.json") || {};
    }

    if (req.params.orders === 'blogs') {
        blogData = require('../../data/BlogData.json');
        elements.push('assets/js/admin/blog.js', );
    }

    res.render('admin/' + orders, {
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title: "admin",
        path: funs.pathToTheRoot(req.originalUrl),
        active: orders,
        draftData,
        blogData,
        languageData,
    })
});

router.get('/editor/edit', ensureAuthenticated, (req, res) => {
    const elements = [...initialElements,
        'assets/css/editor.css',
        'assets/lib/idb/lib/idb.js',
        'assets/js/idbHelper/index.js',
        'assets/js/admin/orders.js',
        'assets/js/admin/edit_blog.js',
        'assets/data/order.json',
        'https://cdn.lineicons.com/2.0/LineIcons.css',
        'assets/js/admin/admin.js',
        "https://kit.fontawesome.com/5eaa28fea9.js",
        'assets/lib/editor/editor.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/header@2.6.1/dist/bundle.min.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/link@2.3.1/dist/bundle.min.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/embed@2/dist/bundle.min.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/quote@2.4.0/dist/bundle.min.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/marker@1.2.2/dist/bundle.min.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/code@2.6.0/dist/bundle.min.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/list@1.6.2/dist/bundle.min.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/delimiter@1.2.0/dist/bundle.min.js',
        'https://cdn.jsdelivr.net/npm/@editorjs/image@2.6.0/dist/bundle.min.js',
    ];


    let draftData = {};
    let blogData = require('../../data/BlogData.json')[req.query.key];
    res.render('admin/editor', {
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title: "Edit",
        path: funs.pathToTheRoot(req.originalUrl),
        // active:orders,
        draftData,
        blogData: JSON.parse(Object.keys(blogData).length ? blogData : '{}'),
        key: req.query.key,
    })
});

router.post('/editor/update', ensureAuthenticated, (req, res) => {
    let { key, article } = req.body;
    let publishedContent = require('../../data/BlogData.json');
    publishedContent[key] = JSON.stringify(article);

    funs.writeObjectToFile('data/BlogData.json', publishedContent);
    res.status(200).json(publishedContent);
});

// router.use('/languages', require('./languages'));





module.exports = router;