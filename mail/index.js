class Art_mailer {
    constructor(nodemailer, user, pass, template) {
        this.nodemailer = nodemailer;
        this.user = user;
        this.pass = pass;
        this.template = template;
        // this.to;
        // this.subject;
        // this.text;
        // this.transporter;
        this.init();

    }
    init() {
        // let hbs = require("nodemailer-express-handlebars");



        const nodemailer = require("nodemailer"),
            user = this.user || require('../config/keys').mail.user,
            pass = this.pass || require('../config/keys').mail.pass;


        this.transporter = nodemailer.createTransport({
            // service: 'togree.com', 
            host: require('../config/keys').mail.host,
            port: require('../config/keys').mail.port,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: !false
            }
        }).on("error", err => {
            console.log(err);
        });


        // const handlebarOptions = {
        //     viewEngine: {
        //         extName: '.hbs',
        //         layoutsDir: __dirname + '/../views/templates/',
        //         defaultLayout: 'email.layout.hbs',
        //         partialsDir: __dirname + '/../views/templates/partials/',
        //     },
        //     viewPath: __dirname + '/../views/templates/',
        //     extName: '.hbs',
        // };

        // this.transporter.use('compile',  hbs(handlebarOptions))
    }

    send(subject, text, to, from, name, attachments, params, context) {
        return new Promise((resolve, reject) => {
            function applyAttachments() {
                let log = {
                    filename: 'logo.png',
                    path: __dirname + '/../assets/img/logo.png',
                    cid: 'logo',
                    contentType: 'image/png',
                    type: 'image/png',
                    encoding: 'base64',
                    disposition: 'attachment'
                };
                if (typeof attachments !== "undefined" && typeof attachments.length !== "undefined") {
                    return [log,
                        ...attachments
                    ]
                } else {
                    return [log]
                }

            }


            let ejs = require("ejs")
            params = params || {};
            const options = {
                message: text,
                name,
                ...params
            }

            ejs.renderFile(__dirname + '/../views/emails/' + this.template + '.ejs', options, (e, data) => {
                if (e) throw e;
                const mailOptions = {
                    from: (typeof from !== "undefined" && typeof from === "string") ? '"' + name + '"<' + from.replace('<', '').replace('>', '') + '>' : '"no-reply"<noreply@togree.com>',
                    to,
                    subject,

                    html: data,
                    // template: text,
                    attachments: applyAttachments(),
                    // context
                };

                this.transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve('Email sent: ' + info.response);
                    }
                });
            });




        })
    }
}

module.exports = Art_mailer;