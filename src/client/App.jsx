import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import ProtectedViews from './auth/ProtectedViews';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { loader as loginLoader } from './auth/Login';
import Root from './home/Root';
import Products from './products/Products';
import Suppliers from './suppliers/Suppliers';
import ErrorBoundary from './components/ErrorBoundary';
import EditProduct, { action as editAction } from './products/EditProduct';
import NewProduct, {
  action as createProductAction,
} from './products/NewProduct';
import EditSupplier, {
  action as editSupplierAction,
} from './suppliers/EditSupplier';
import NewSupplier, {
  action as createSupplierAction,
} from './suppliers/NewSupplier';
import Categories from './components/Categories';

const App = () => {
  const { loginAction } = useContext(AuthContext);

  const routes = [
    {
      path: '/',
      element: <Root />,
      hydrateFallback: <div>Loading...</div>,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: 'login',
          element: <Login />,
          loader: loginLoader,
          action: loginAction,
        },
        {
          path: 'dashboard',
          element: (
            <ProtectedViews>
              <Dashboard />
            </ProtectedViews>
          ),
        },
        {
          path: 'categories',
          element: (
            <ProtectedViews>
              <Categories />
            </ProtectedViews>
          ),
        },
        {
          path: 'products',
          element: (
            <ProtectedViews>
              <Products />
            </ProtectedViews>
          ),
        },
        {
          path: 'suppliers',
          element: (
            <ProtectedViews>
              <Suppliers />
            </ProtectedViews>
          ),
        },
        {
          path: 'edit/products/:productId',
          element: (
            <ProtectedViews>
              <EditProduct />
            </ProtectedViews>
          ),
          action: editAction,
        },
        {
          path: 'newProduct',
          element: (
            <ProtectedViews>
              <NewProduct />
            </ProtectedViews>
          ),
          action: createProductAction,
        },
        {
          path: 'newSupplier',
          element: (
            <ProtectedViews>
              <NewSupplier />
            </ProtectedViews>
          ),
          action: createSupplierAction,
        },
        {
          path: 'edit/suppliers/:supplierId',
          element: (
            <ProtectedViews>
              <EditSupplier />
            </ProtectedViews>
          ),
          action: editSupplierAction,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes, {
    future: {
      v7_startTransition: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
    },
  });

  return <RouterProvider router={router} />;
};
export default App;
