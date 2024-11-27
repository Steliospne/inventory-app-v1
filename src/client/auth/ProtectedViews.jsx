import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedViews = ({ children }) => {
  const { user } = useContext(AuthContext);

  console.log('I am the protector');

  if (!user) {
    return <Navigate to={'/login'} />;
  }
  return children;
};

export default ProtectedViews;
