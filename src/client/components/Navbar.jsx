import { NavLink } from 'react-router-dom';

const Navbar = ({ user, logoutAction }) => {
  return (
    <header className='col-start-2 flex justify-end bg-zinc-200 px-2 py-1 drop-shadow dark:bg-zinc-800 dark:text-white'>
      <nav className='flex  gap-6 text-xl font-semibold'>
        <NavLink to='/' className='p-2 hover:rounded-lg hover:bg-emerald-200'>
          Home
        </NavLink>
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
