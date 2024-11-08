import { NavLink } from 'react-router-dom';
import { Box } from 'lucide-react';

const Navbar = ({ user, logoutAction }) => {
  return (
    <header className='flex bg-zinc-200 px-2 py-1 drop-shadow-md dark:bg-zinc-800 dark:text-white'>
      <div className='flex items-center mr-auto'>
        <Box className='h-8 w-8 text-emerald-600' />
        <span className='ml-2 text-xl font-bold text-gray-900'>
          InventoryPro
        </span>
      </div>
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
  );
};

export default Navbar;
