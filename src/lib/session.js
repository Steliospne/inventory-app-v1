import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const encrypt = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
};

const decrypt = async (session) => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
    return null;
  }
};

const createSession = async (userId) => {
  const expiresAt = new Date(Date.now() + MAX_AGE);
  const session = await encrypt({
    userId,
    expiresAt,
  });

  return { session, expiresAt };
};

const updateSession = async (req) => {
  const session = req.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + MAX_AGE);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
};

const verifySession = async () => {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get('session')?.value);
  if (!session?.userId) {
    return null;
  }
  return { userId: session.userId };
};

const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('session');
};

export {
  encrypt,
  decrypt,
  createSession,
  updateSession,
  deleteSession,
  verifySession,
};
