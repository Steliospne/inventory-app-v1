import axios from 'axios';
import { createContext, useState } from 'react';
import { redirect } from 'react-router';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null,
  );
  const loginAction = async ({ params, request }) => {
    try {
      const formData = await request.formData();
      const userData = Object.fromEntries(formData);

      const { data } = await axios.post(
        'http://localhost:3000/login',
        {
          username: userData.username,
          password: userData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(data.messages);

      if (data) {
        if (!data.user) {
          params.message = data.messages;
          return;
        }
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return redirect('/dashboard');
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
