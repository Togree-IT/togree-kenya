const express = require('express'),

    flash = require("connect-flash"),

    session = require("express-session");
const ejs = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 5505;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
    // Serve stastics
app.use("/assets", express.static(__dirname + "/assets"));
app.use("/favicon", express.static(__dirname + "/favicon.ico"));

// Session
app.use(session({
    secret: 'fdferedsdweferewedwrersdfs484_54',
    cookie: {
        // secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
    },
    // store: sess_store,
    resave: true,
    saveUninitialized: true
}));

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
app.use("/user", require("./routes/user"));
app.use("/products", require("./routes/products"));
app.use("/services", require("./routes/services"));
app.use("/api", require("./routes/api"));
app.use("/url", require("./routes/url"));

// Listen
app.listen(PORT, console.log(`Server listening at ${PORT}`));