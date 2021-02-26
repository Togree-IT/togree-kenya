const express = require("express"),
    router = express.Router(),
    funs = require('../functions');

router.post("/", (req, res) => {
    if (req.query.ref === 'dom') {

        let { name, message } = req.body, { v4: uuidv4 } = require('uuid'),
            ticketID = uuidv4();
        ticketID = ticketID.substring(ticketID.lastIndexOf('-') - 4, ticketID.lastIndexOf('-'));

        let subject = funs.language("New Ticket", funs.getAppCookies(req)['language']) + ' (' + ticketID + ') From ' + name;

        funs.sendEmail(message, subject, "togreeit@gmail.com", null, null, "ticket", [], {
            lang_: _ => funs.language(_, funs.getAppCookies(req)['language']),
            _language: require("../language/" + funs.getAppCookies(req)['language'] + ".json"),

        }).then(done => {
            console.log(done);
            res.status(200).json({ status: "success" })
        }).catch(err => {
            res.status(500).json({ status: "failed" })
            console.log(err);
        })

    }
})

module.exports = router;