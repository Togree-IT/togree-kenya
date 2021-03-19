module.exports = {
    ensureAuthenticated(req, res, next) {
        // 
        if (req.isAuthenticated()) {
            if (req.user) {
                if (req.user.privillege === 'super_admin' || user.privilleges === 'admin') {
                    if (!req.originalUrl.match('/admin')) {
                        return res.redirect("../admin")
                    }
                    return next()
                }
                if (req.user.privillege === 'reseler') {
                    if (!req.originalUrl.match('/dashboard')) {
                        return res.redirect("../dashboard")
                    }
                    return next()
                }
                if (req.user.privillege === 'client') {
                    if (!req.originalUrl.match('/dashboard')) {
                        return res.redirect("../dashboard")
                    }
                    return next()
                }
            }
            return next();
        }
        req.flash("error_msg", "Please login to view this resource");
        res.redirect(`../users/login`);
    },
    ensureUnAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        if (req.user) {
            if (req.user.privillege === 'super_admin' || user.privilleges === 'admin') {
                if (!req.originalUrl.match('/admin')) {
                    return res.redirect("../admin")
                }
                return next()
            }
            if (req.user.privillege === 'reseler') {
                if (!req.originalUrl.match('/dashboard')) {
                    return res.redirect("../dashboard")
                }
                return next()
            }
            if (req.user.privillege === 'client') {
                if (!req.originalUrl.match('/dashboard')) {
                    return res.redirect("../dashboard")
                }
                return next()
            }
        }
        // res.redirect(`../dashboard`);
        next();
    },
}