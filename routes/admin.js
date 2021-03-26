const express = require("express"),
    router = express.Router()
funs = require('../functions');


const { initialElements } = funs;

router.get("/main/:id", (req, res) => {

    let adminName = req.params.id.replace('@', '');
    const elements = [...initialElements, "assets/css/editor.min.css", ]

});



router.get("/", (req, res) => {
    const elements = [...initialElements,
        'assets/css/editor.css',
        'assets/lib/idb/lib/idb.js',
        'assets/js/idbHelper/index.js',
        'assets/js/orders.js',
        'assets/data/order.json',
        'https://cdn.lineicons.com/2.0/LineIcons.css',
        'assets/js/admin.js',
        "https://kit.fontawesome.com/5eaa28fea9.js",
    ];

    let orders = 'orders';

    // console.log(draftData);

    res.render('admins/' + orders, {
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title: "admin",
        path: funs.pathToTheRoot(req._parsedUrl.path),
        active: orders,
        // draftData,
    });
});



router.get("/:orders", (req, res) => {


    const elements = [...initialElements,
        'assets/css/editor.css',
        'assets/lib/idb/lib/idb.js',
        'assets/js/idbHelper/index.js',
        'assets/js/orders.js',
        'assets/data/order.json',
        'https://cdn.lineicons.com/2.0/LineIcons.css',
        'assets/js/admin.js',
        "https://kit.fontawesome.com/5eaa28fea9.js",
    ];

    let orders = req.params.orders === '' ? 'orders' : req.params.orders;
    let draftData = {};
    let blogData = {};
    let userdata = {};

    req.params.orders === 'createblog' ? (elements.push(
            'assets/js/createBlog.js',
            'assets/lib/editor/editor.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/header@2.6.1/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/link@2.3.1/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/embed@2/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/quote@2.4.0/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/marker@1.2.2/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/code@2.6.0/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/list@1.6.2/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/delimiter@1.2.0/dist/bundle.min.js',
            'https://cdn.jsdelivr.net/npm/@editorjs/image@2.6.0/dist/bundle.min.js', ),
        draftData = require('../draft.json')) : {};


    req.params.orders === 'blogs' ? (elements.push(
        'assets/js/blog.js', ), blogData = require('../BlogData.json')) : {};

    req.params.orders === 'settings' ? (elements.push('assets/js/settings.js', )) : {};

    req.params.orders === 'users' ? (elements.push(
        'assets/js/Adminuser.js', 'https://unpkg.com/object-exporter@3.2.1/dist/objectexporter.min.js', ), userdata = require('../assets/data/userData.json')) : {};




    res.render('admins/' + orders, {
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title: "admin",
        path: funs.pathToTheRoot(req._parsedUrl.path),
        active: orders,
        draftData,
        blogData,
        userdata,
    })
});



router.get('/editor/edit', (req, res) => {
    const elements = [...initialElements,
        'assets/css/editor.css',
        'assets/lib/idb/lib/idb.js',
        'assets/js/idbHelper/index.js',
        'assets/js/orders.js',
        'assets/js/edit_blog.js',
        'assets/data/order.json',
        'https://cdn.lineicons.com/2.0/LineIcons.css',
        'assets/js/admin.js',
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
    let blogData = require('../BlogData.json')[req.query.key];
    res.render('admins/editor', {
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title: "Edit",
        path: funs.pathToTheRoot(req._parsedUrl.path),
        // active:orders,
        draftData,
        blogData: JSON.parse(Object.keys(blogData).length ? blogData : '{}'),
        key: req.query.key,
    })
});


router.post('/editor/update', (req, res) => {
    let { key, article } = req.body;
    let publishedContent = require('../BlogData.json');
    publishedContent[key] = JSON.stringify(article);

    writeFile('BlogData.json', publishedContent);
    res.status(200).json(publishedContent);
})

router.post('/resetPassword', (req, res) => {
    const pwddatas = req.body;
    console.log(pwddatas);
    res.status(200).json({ status: "success", msg: "password successfully changed" })
})

router.post('/resetUserPass', (req, res) => {
    const userDeatilsData = req.body;
    console.log(userDeatilsData);
    res.status(200).json({ status: "success", msg: "User reset password was successful" })
})

router.post('/createOffer', (req, res) => {
    const offerdata = req.body;
    console.log(offerdata);
    res.status(200).json({ status: "success", msg: "offer successfully created" })
})

function writeFile(filename, storedBlog) {
    let Filesystem = require("fs");
    Filesystem.writeFile(filename, JSON.stringify(storedBlog, null, 2), (err) => {
        if (err) throw err;
        if (typeof cb === 'function') cb()
    });
}




module.exports = router;