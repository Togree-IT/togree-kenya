const express = require("express"),
    // passport = require("passport"),
    router = express.Router(),
    funs = require('../functions');

router.get('/@top-products', (req, res) => {

    require('../functions').destroy();
    require('../functions').con(require('../config/index').db.database, connect => {

        var sql = 'SELECT name,short_description,product_img,price,product_id FROM products Where recommended="true" ORDER BY dt LIMIT 8';

        let products = [];
        connect.query(sql, (err, results) => {
            if (err) console.log(err);

            if (results && results.length) {

                for (let i = 0; i < results.length; i++) {
                    let product = results[i];
                    // product.features = JSON.parse(product.features);
                    // product.specs = JSON.parse(product.specs);
                    // product.product_preview_imgs = JSON.parse(product.product_preview_imgs);
                    products.push(product)
                }
            }

            res.status(200).json(products);

        })


    });
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


// Get Cats
// router.get('/products', (req, res) => {
//     let content = funs.getFullCont.getProducts({});

//     content.then(data => {
//         res.status(200).json(data.items);
//     }).catch(err => {
//         console.log(err.details);
//     })
// });

// Get product by id
// router.get('/products/:id', (req, res) => {
//     let id = req.params.id;
//     let content = funs.getFullCont.getProduct(id, {});

//     content.then(data => {
//         res.status(200).json(data.items);
//     }).catch(err => {
//         console.log(err.details);
//     });
// });

// Get all poroducts
router.get('/products/get_promos', (req, res) => {
        res.status(200).json(require('../data/product_promo.json'))
    })
    // Get all poroducts
router.get('/products/get_all', (req, res) => {

    require('../functions').destroy();
    require('../functions').con(require('../config/index').db.database, connect => {
        // var sql = "SELECT price,name, categorys.name AS category FROM products JOIN categorys ON products.category_id = categorys.id"
        var sql = "";
        if (Object.keys(req.query).length) {
            let { selector, sort, limit } = req.query;
            if (selector) {
                sql += 'SELECT ' + selector + ', categorys.name AS category FROM products JOIN categorys ON products.category_id = categorys.id';
            } else {
                sql += 'SELECT * FROM products'
            }
            if (sort) {
                sql += ' ORDER BY ' + sort;
            }
            if (limit) {
                sql += ' LIMIT ' + limit;
            }
        } else {
            sql += 'SELECT *, categorys.name AS category FROM products JOIN categorys ON products.category_id = categorys.id'
        }
        let products = [];
        connect.query(sql, (err, results) => {
            if (err) console.log(err);


            if (results && results.length) {

                for (let i = 0; i < results.length; i++) {
                    let product = results[i];
                    // product.features = JSON.parse(product.features);
                    // product.specs = JSON.parse(product.specs);
                    // product.product_preview_imgs = JSON.parse(product.product_preview_imgs);
                    products.push(product)
                }

            }
            res.status(200).json(products);
            // res.status(200).json(products);
        })


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



router.post('/products/rate', (req, res) => {
    let content = funs.getFullCont.getProducts({});

    content.then(data => {
        res.status(200).json(data.items);
    }).catch(err => {
        console.log(err.details);
    })
});

module.exports = router;