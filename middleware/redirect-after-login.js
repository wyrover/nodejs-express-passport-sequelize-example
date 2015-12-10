'use struct';

module.exports = function(req, res/*, next*/) {
    var config = req.app.locals;
    var returnTo;
    if (req.session && req.session.returnTo && req.session.returnTo != config.paths.logout) {
        returnTo = req.session.returnTo;
        delete req.session.returnTo;
    } else {
        returnTo = config.paths.redirectAfterLogin;
    }
    res.redirect(returnTo);
};
