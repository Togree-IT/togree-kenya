const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');

router.get('/all', (req, res) => {
    res.status(200).json(require('../language/languages.json'))
});
router.get('/choose/:id', (req, res) => {
    funs.setCookie(res, {
        name: 'language',
        value: req.params.id,
        exp: false,
    });
    let redir = req.query.protocol.split(':').join('').split('/').join('') + '://' + req.headers.host + req.query.ref
        // console.log(redir);
    res.redirect(redir)

});
router.get('/translate/:id', (req, res) => {
    let _ = req.query.name;
    let _name = funs.language(_, req.params.id)
    res.status(200).send(_name);
});


module.exports = router;