import Router from 'express';

import passport from 'passport';
import session from 'express-session';
import { Strategy } from 'passport-local';
import pool from '../db/pool.js';
import { LoginSchema } from '../../lib/definitions.js';

export const userRouter = Router();

userRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

userRouter.use(passport.session());

passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const validatedFields = LoginSchema.safeParse({
        username: username,
        password: password,
      });

      if (!validatedFields.success) {
        const errors = validatedFields.error.errors;

        let message = {};
        errors.forEach((error) => {
          const field = error.path[0];
          if (message.hasOwnProperty(field)) {
            message[field].push(error.message);
          } else {
            message = { ...message, [field]: [error.message] };
          }
        });

        return done(null, false, { messages: message });
      }

      const { rows } = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [username],
      );
      const user = rows[0];

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

userRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info, status) => {
    req.session.regenerate((err) => {
      if (err) next(err);

      // store user information in session, typically a user id
      req.session.user = user;
      req.user = user;

      // save the session before redirection to ensure page
      // load does not happen before session is saved
      req.session.save((err) => {
        if (err) return next(err);
      });

      res.send({
        data: { user: req.user, messages: info?.messages },
      });
    });
  })(req, res, next);
});

userRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.send({
      data: { user: req.user },
    });
  });
});
