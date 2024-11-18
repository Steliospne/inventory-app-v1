import pg from 'pg';
const { Pool } = pg;

const isProd = process.env.NOD_ENV !== 'development';

const USER = isProd
  ? process.env.DATABASE_USER_LOCAL
  : process.env.DATABASE_USER_REMOTE;
const SECRET = isProd
  ? process.env.DATABASE_SECRET_LOCAL
  : process.env.DATABASE_SECRET_REMOTE;
const HOST = isProd
  ? process.env.DATABASE_HOST_LOCAL
  : process.env.DATABASE_HOST_REMOTE;
const NAME = isProd
  ? process.env.DATABASE_NAME_LOCAL
  : process.env.DATABASE_NAME_REMOTE;

const pool = new Pool({
  connectionString: `postgresql://${USER}:${SECRET}@${HOST}/${NAME}`,
});

export default pool;
