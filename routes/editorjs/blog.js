data = {
    "success": 1,
    "file": {
        "url": "http://localhost:5505/assets/img/home/icons8-bar-chart-3d-64-1.png"
    }
}

const { clear } = require("console");
const express = require("express");
let Filesystem = require("fs");



router = express.Router();
storage = require("../../config/multer-storage"),
    multer = require('multer'),
    path = require("path"),
    _upload = multer({ storage: storage("./assets/img/blogs", null, multer, path) }).single("proposal_template");


router.post('/uploadFile', (req, res) => {
    console.log(req.file);
    res.status(200).json(data)
})


router.post('/createBlog', (req, res) => {

    const articledata = req.body;

    savedata(articledata, 'BlogData.json', false, () => {

        darftNull = { Title: '', article: [] };
        savedata(darftNull, 'draft.json', !false, function cb() {
            res.status(200).json({ status: "successful" });
        });
    });


});


router.post('/draftBlog', (req, res) => {
    const blogdraft = req.body;
    console.log(blogdraft);
    savedata(blogdraft, 'draft.json', true, e => {
        res.status(200).json({ status: 'successful' })
    });
})




router.get('/BlogContent', (req, res) => {
    publishedContent = require('../../BlogData.json');
    res.status(200).json(publishedContent);
})



function savedata(blogdata, filename, draft = false, cb) {
    storedBlog = require('../../' + filename);
    if (draft === true) {
        blogdata = JSON.stringify(blogdata, null, 2);
        storedBlog = blogdata;
    } else {
        console.log(blogdata);
        blogdata[blogdata.Title.split(' ').join('_').toLowerCase()] = JSON.stringify(blogdata, null, 2);
        delete blogdata.Title;
        delete blogdata.article;

        Object.assign(storedBlog, blogdata);
    }


    Filesystem.writeFile(filename, JSON.stringify(storedBlog, null, 2), (err) => {
        if (err) throw err;
        if (typeof cb === 'function') cb()
    });


}

function writeFile(filename, storedBlog) {


    Filesystem.writeFile(filename, JSON.stringify(storedBlog, null, 2), (err) => {
        if (err) throw err;
        if (typeof cb === 'function') cb()
    });
}


module.exports = router;