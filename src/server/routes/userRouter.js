import Router from 'express';
import bcrypt from 'bcryptjs';
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
    // Validate login fields
    try {
      const validatedFields = LoginSchema.safeParse({
        username: username,
        password: password,
      });

      // If validations fails provide user with info
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
        'SELECT * FROM users WHERE email = $1;',
        [username],
      );
      const user = rows[0];

      // If validation is ok check if there is a user
      if (!user)
        return done(null, false, {
          messages: { username: ['User not found with this email'] },
        });

      const matches = await bcrypt.compare(password, user.password);

      // Finally check for a matching password
      if (!matches)
        return done(null, false, {
          messages: { password: ['Wrong credentials'] },
        });

      return done(null, user.id);
    } catch (err) {
      return done(err);
    }
  }),
);

userRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info, status) => {
    if (err) next(err);

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

      if (!user)
        return res.status(401).send({ data: { messages: info?.messages } });

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

userRouter.use((err, req, res, next) => {
  console.error('Error:', err.message);
  next();
  res.status(500);
});
