import pg from 'pg';
const { Pool } = pg;

const USER = process.env.DATABASE_USER_LOCAL;
const SECRET = process.env.DATABASE_SECRET_LOCAL;
const HOST = process.env.DATABASE_HOST_LOCAL;
const NAME = process.env.DATABASE_NAME_LOCAL;

const pool = new Pool({
  connectionString: `postgresql://${USER}:${SECRET}@${HOST}/${NAME}`,
});

export default pool;
