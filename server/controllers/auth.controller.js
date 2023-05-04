const passport = require('passport');
const jwt = require('jsonwebtoken');

/**
 * Login
 * @param req
 * @param res
 * @param next
 * @returns void
 */
login = async (req, res, next) => {
    passport.authenticate(
        'login',
        async (err, user) => {
            try {
                if (err || !user) {
                    const error = new Error('An error occurred.');

                    return next(error);
                }

                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { _id: user._id, email: user.email };

                        // Use the 'expiresIn' option to set ttl for the token
                        // const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {expiresIn: '2h'});
                        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                        return res.json({ token, user: body });
                    }
                );
            } catch (error) {
                return next(error);
            }
        }
    )(req, res, next);
}

signup = [passport.authenticate('signup', { session: false }),
async (req, res) => {
    res.json({
        message: 'OK',
    });
}]

module.exports = {
    login,
    signup
};