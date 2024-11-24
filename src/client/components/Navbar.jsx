import { NavLink } from 'react-router-dom';

const Navbar = ({ user, logoutAction }) => {
  return (
    <header className='sticky top-0 z-10 col-start-2 flex justify-end bg-zinc-200 px-2 py-1 drop-shadow dark:bg-zinc-800 dark:text-white'>
      <nav className='flex gap-6 text-xl font-semibold'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? 'rounded-lg bg-emerald-500 p-2 text-white hover:rounded-lg hover:bg-emerald-700'
              : 'p-2 hover:rounded-lg hover:bg-emerald-400 hover:text-white'
          }
        >
          Home
        </NavLink>
        <NavLink
          to={user ? '#' : '/login'}
          onClick={user && logoutAction}
          className='p-2 hover:rounded-lg hover:bg-emerald-400 hover:text-white'
        >
          {user ? 'Logout' : 'Login'}
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
