import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import ProtectedViews from './auth/ProtectedViews';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { loader as loginLoader } from './auth/Login';
import Root from './home/Root';
import Products from './products/Products';

const App = () => {
  const { loginAction } = useContext(AuthContext);

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <Root />,
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
              {
                path: '/products',
                element: <Products />,
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
