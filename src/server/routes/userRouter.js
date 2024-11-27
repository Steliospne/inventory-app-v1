import Router from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy } from 'passport-local';
import pool from '../db/pool.js';
import { LoginSchema } from '../../client/lib/definitions.js';
import { createSession } from '../lib/session.js';

export const userRouter = Router();

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

userRouter.get('/', (req, res, next) => {
  console.log(req.path);
  next();
});

userRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', async (err, user, info, status) => {
    if (err) next(err);

    if (!user) return res.send({ messages: info?.messages });

    const { session, expiresAt } = await createSession(user);

    res.cookie('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });

    res.send({
      data: { user: user, messages: info?.messages },
    });
  })(req, res, next);
});

userRouter.get('/logout', (req, res, next) => {
  res.clearCookie('session', { httpOnly: true, secure: true, sameSite: 'lax' });

  res.send({
    data: { user: null },
  });
});

userRouter.use((err, req, res, next) => {
  console.error('Error:', err.message);
  next();
  res.status(500);
});
