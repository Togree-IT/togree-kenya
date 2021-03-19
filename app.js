const express = require('express'),

    flash = require("connect-flash"),

    session = require("express-session"),
    funs = require('./functions');
const ejs = require('express-ejs-layouts');
const passport = require('passport');
const { connect } = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5505;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    // Serve stastics
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/favicon", express.static(__dirname + "/favicon.ico"));

// Session
var MySQLStore = require('express-mysql-session')(session);
let sessionDB = require('./config/db').sessionConn();
// var connection = mysql.createConnection(); // or mysql.createPool(options);require('./functions/dbHelper').con()
var sessionStore = new MySQLStore({} /* session store options */ , require('./functions').con(require('./config').db.sessionDB));

app.use(session({
    secret: 'fdferedsdweferewedwrersdfs484_54',
    cookie: {
        // secure: true,
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
    // console.log(req.isAuthenticated());
    res.locals.logged_in = typeof req.isAuthenticated !== "undefined" ? req.isAuthenticated() : false;
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
app.use(require("./routes/404"));
app.use("/", require("./routes/index"));
app.use("/language", require("./routes/language"));
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/services", require("./routes/services"));
app.use("/api", require("./routes/api"));
app.use("/url", require("./routes/url"));
app.use("/admin", require("./routes/admin"));

app.set("trust proxy", "103.242.142.186");
// DB
require('./config/db').con();

// Listen
app.listen(PORT, console.log(`Server listening at ${PORT}`));