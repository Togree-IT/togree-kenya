const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');

router.get('/@top-products', (req, res) => {
    res.status(200).json(require('../data/products.json'))
});
router.get('/@top-sliders', (req, res) => {
    res.status(200).json(require('../data/sliders.json'))
});

// Get Cats
router.get('/category', (req, res) => {
    let content = funs.getFullCont.getCategories({});

    content.then(data => {
        res.status(200).json(data.items);
    }).catch(err => {
        console.log(err.details);
    })

});
// Get Cats
router.get('/products', (req, res) => {
    let content = funs.getFullCont.getProducts({});

    content.then(data => {
        res.status(200).json(data.items);
    }).catch(err => {
        console.log(err.details);
    })
});
// Get product by id
router.get('/products/:id', (req, res) => {
    let id = req.params.id;
    let content = funs.getFullCont.getProduct(id, {});

    content.then(data => {
        res.status(200).json(data.items);
    }).catch(err => {
        console.log(err.details);
    });
});

// Get status
router.get('/status', (req, res) => {
    let content = funs.getFullCont.getStatus({});

    content.then(data => {
        res.status(200).json(data.items);
    }).catch(err => {
        console.log(err.details);
    });

});
// Get pages
router.get('/list_pages', (req, res) => {
    let content = funs.getFullCont.getPages({});

    content.then(data => {
        res.status(200).json(data.items);
    }).catch(err => {
        console.log(err.details);
    });

});
// Get running program
router.get('/@running_program', (req, res) => {
    let content = funs.getFullCont.getRunningProgram({});

    content.then(data => {
        res.status(200).json(data.items);
    }).catch(err => {
        console.log(err.details);
    });

});
// Get running program
router.get('/@company_address', (req, res) => {
    let content = funs.getFullCont.getAddress();

    content.then(data => {

        res.status(200).json(data.items[0].fields);
    }).catch(err => {
        console.log(err.details);
    });

});


router.use("/contact", require("../routes/contact"));



module.exports = router;