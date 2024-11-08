import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import ProtectedViews from './auth/ProtectedViews';
import Home from './home/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { loader as loginLoader } from './auth/Login';

const App = () => {
  const { loginAction } = useContext(AuthContext);

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/login',
            element: <Login />,
            loader: loginLoader,
            action: loginAction,
          },
          {
            element: <ProtectedViews />,
            children: [
              {
                path: '/dashboard',
                element: <Dashboard />,
              },
            ],
          },
        ],
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_skipActionErrorRevalidation: true,
      },
    },
  );

  return <RouterProvider router={router} />;
};

export default App;
