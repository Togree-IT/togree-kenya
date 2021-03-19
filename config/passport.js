const LocalStrategy = require("passport-local").Strategy,
    //mongoose = require("mongoose"),
    // bcrypt = require("bcryptjs"),
    // Get keys
    errors = [];


module.exports = (passport) => {
    passport.use(
        new LocalStrategy({
            usernameField: 'user_name'
        }, (email, password, done) => {
            // Match user email
            require('../functions').destroy();
            require('../functions').con(require('../config/index').db.database, connect => {
                connect.query("SELECT * FROM users WHERE username='" + email + "' OR email='" + email + "' LIMIT 1", (err, found) => {



                        if (!found[0]) {
                            return done(null, false, {
                                message: 'That email is not registered'
                            })
                        }

                        if (require('md5')(password) !== found[0].password) {
                            return done(null, false, {
                                message: 'Password incorrect, check your password and try again!'
                            });
                        }

                        return done(null, found[0]);
                        /*  connect.query("SELECT * FROM users WHERE (username='" + email + "' OR email='" + email + "') AND password=MD5('" + password + "') LIMIT 1", (err, user) => {
                            if (!user) {
                                return done(null, false, {
                                    message: 'Password incorrect, check your password and try again!'
                                })
                            }

                            return done(null, user[0]);

                            // if (!user.email_verified) {
                            //   return sendNotification();
                            // }
                        }) */
                    })
                    .on('end', e => require('../functions').destroy())
            })
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}