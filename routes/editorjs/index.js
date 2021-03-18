data = {
    "success" : 1,
    "meta": {
        "title" : "CodeX Team",
        "description" : "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
        "image" : {
            "url" : "https://codex.so/public/app/img/meta_img.png"
        }
    }
};

const express = require("express")
router = express.Router();
let Filesystem = require ("fs");
    

    router.get('/fetchUrl',(req,res)=>{
        let {url}= req.query;
        const fetchMetaData = require('meta-fetcher');

        (async () => {
            const result = await fetchMetaData(url);
            console.log(result);
            data['meta']= {
                title: result.basic_metadata['title']||'',
                description: result.basic_metadata['description']||'',
                image: {
                    url: result.opengraph['og:image']
                }
            };
            
            res.status(200).send(data)
        })();
        
    });

    


router.use('/blog', require('./blog'));

    module.exports = router;