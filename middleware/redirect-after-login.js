'use struct';

module.exports = function(req, res, next) {
    var config = req.app.locals;
    var returnTo;
    if (req.session && req.session.returnTo && config.paths.logout != req.session.returnTo) {
        returnTo = req.session.returnTo;
    } else {
        returnTo = config.paths.redirectAfterLogin;
    }
    res.redirect(returnTo);
};
