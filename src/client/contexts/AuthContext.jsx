import { createContext, useState } from 'react';
import { redirect } from 'react-router-dom';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  );
  const loginAction = async ({ params, request }) => {
    try {
      const formData = await request.formData();
      const userData = Object.fromEntries(formData);

      const res = await fetch(new URL('http://localhost:3000/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      });

      if (res.status === 404) {
        throw new Response('', { status: 404 });
      }

      const { data } = await res.json();

      if (res.ok && data) {
        if (!data.user) {
          return params.message === undefined
            ? (params.message = null)
            : (params.message = data.messages);
        }
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return redirect('/dashboard');
      }

      if (res.status === 401) {
        if (data) {
          redirect('/login');
          return data.messages === undefined
            ? (params.message = null)
            : (params.message = data.messages);
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logoutAction = async () => {
    try {
      const res = await fetch(new URL('http://localhost:3000/logout'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const { data } = await res.json();
        if (!data.user) {
          setUser(null);
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
