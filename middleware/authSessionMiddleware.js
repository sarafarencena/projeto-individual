function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/signin');
}

module.exports = { ensureAuthenticated };