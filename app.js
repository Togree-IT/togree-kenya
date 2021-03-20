const express = require('express'),

    flash = require("connect-flash"),

    session = require("express-session"),
    funs = require('./functions');
const ejs = require('express-ejs-layouts');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5505;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// Serve stastics
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/favicon", express.static(__dirname + "/favicon.ico"));

// Session Store
var MySQLStore = require('express-mysql-session')(session);
require('./config/db').sessionConn();
var sessionStore = new MySQLStore({}, require('./functions').con(require('./config').db.sessionDB));

// Session
app.use(session({
    secret: 'fdferedsdweferewedwrersdfs484_54',
    cookie: {
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
    },
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Connect flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");

    res.locals.success_msg = res.locals.success_msg.length ? [funs.language(res.locals.success_msg[0], funs.getAppCookies(req)['language'])] : res.locals.success_msg;
    res.locals.error_msg = res.locals.error_msg.length ? [funs.language(res.locals.error_msg[0], funs.getAppCookies(req)['language'])] : res.locals.error_msg;
    res.locals.error = res.locals.error.length ? [funs.language(res.locals.error[0], funs.getAppCookies(req)['language'])] : res.locals.error;

    res.locals.logged_in = typeof req.isAuthenticated !== "undefined" ? req.isAuthenticated() : false;
    res.locals.user = typeof req.isAuthenticated !== "undefined" ? req.user : undefined;
    next();
});



// EJS
app.use(ejs);
app.set("view engine", "ejs");
app.use(require('./functions').useLocals);


// Set Language cookie
app.use(require('./functions').setLangCookie);
app.use(require('./functions')._language);

// Routes
// app.use(require("./routes/404"));
app.use("/", require("./routes/index"));
app.use("/language", require("./routes/language"));
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/services", require("./routes/services"));
app.use("/api", require("./routes/api"));
app.use("/url", require("./routes/url"));
app.use("/admin", require("./routes/admin"));
app.use("/admin/languages", require("./routes/admin/languages"));

app.set("trust proxy", "103.242.142.186");
// DB
require('./config/db').con();

// Handle 404
app.use(function(req, res, next) {
    let { initialElements } = funs;
    const elements = [...initialElements,
        "assets/css/blog.min.css",
    ]
    let title = funs.language('404 Page Not found', funs.getAppCookies(req)['language'] || 'en');
    const meta = funs.meta({
        title,
        description: "",
        keywords: '',
        preview_image: '',
        theme_color: "#fff"
    }, req);

    res.render("404", {
        meta,
        elements,
        menu: true,
        lang_: _ => funs.language(_, funs.getAppCookies(req)['language'] || 'en'),
        _language: require("./language/" + funs.getAppCookies(req)['language'] || 'en' + ".json"),
        language: funs.getAppCookies(req)['language'] || 'en',
        languages: require("./language/languages.json"),
        renderImplimental: (_) => funs.renderImplimental(_),
        title,
        path: funs.pathToTheRoot(req.originalUrl),
        cartItems: JSON.parse(funs.getAppCookies(req)['cartItems']) || '',

    })
    next();
});
// Listen
app.listen(PORT, console.log(`Server listening at ${PORT}`));