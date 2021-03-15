
const express = require("express"),
router = express.Router()
funs = require('../functions');


const { initialElements } = funs;

router.get("/main/:id", (req, res) => {
    
    let adminName = req.params.id.replace('@', '');
    const elements = [...initialElements,"assets/css/editor.min.css",]

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
    'assets/js/blog.js',
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
    "https://kit.fontawesome.com/5eaa28fea9.js", 
      ];


    let orders = req.params.orders === ''?'orders':req.params.orders;
    let draftData = req.params.orders ==='createblog' ? require('../draft.json'):{};
    // console.log(draftData);

    res.render('admins/'+orders,{
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
        language: funs.getAppCookies(req)['language'],
        languages: require("../language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title:"admin",
        path: funs.pathToTheRoot(req._parsedUrl.path),
        active:orders,
        draftData,
    })
})



module.exports = router;