import { NavLink, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
const Home = () => {
  const { user, logoutAction } = useContext(AuthContext);
  return (
    <div className='flex h-svh flex-col'>
      <header className='bg-zinc-200 px-2 py-1 drop-shadow-md dark:bg-zinc-800 dark:text-white'>
        <nav className='flex gap-6 text-xl font-semibold'>
          <NavLink to='/' className='p-2 hover:rounded-lg hover:bg-emerald-200'>
            Home
          </NavLink>
          {user && (
            <NavLink
              to='/dashboard'
              className='p-2 hover:rounded-lg hover:bg-emerald-200'
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to={user ? '#' : '/login'}
            onClick={user && logoutAction}
            className='ml-auto p-2 hover:rounded-lg hover:bg-emerald-200'
          >
            {user ? 'Logout' : 'Login'}
          </NavLink>
        </nav>
      </header>
      <main className='flex-1 bg-zinc-100 dark:bg-zinc-600 dark:text-white'>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
