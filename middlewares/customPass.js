import passport from 'passport';

export default {
  checkToken: (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
      // setting the user information to be accessed on req object as req.user
      req.user = user;
      if (err) {
        return res.status(520).send({ error: { body: [err.message] } });
      }
      // check if token is in headers and if not return related customized errors
      if (!user) {
        const status = info.message === 'user does not exist' ? 404 : 401;
        return res.status(status).send({
          status,
          error: info.message
        });
      }

      return next();
    })(req, res, next);
  },
};
