import { NavLink } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo';

const Sidebar = ({ user }) => {
  return (
    <div className='sticky top-0 col-start-1 row-span-2 row-start-1 h-min'>
      <BrandLogo />
      {user && (
        <aside className='my-4 flex flex-col'>
          <NavLink
            to='/dashboard'
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-emerald-500 px-2 py-3 text-white hover:rounded-lg hover:bg-emerald-700'
                : 'w-full px-2 py-3 hover:rounded-lg hover:bg-emerald-400 hover:text-white'
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to='/categories'
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-emerald-500 px-2 py-3 text-white hover:rounded-lg hover:bg-emerald-700'
                : 'w-full px-2 py-3 hover:rounded-lg hover:bg-emerald-400 hover:text-white'
            }
          >
            Categories
          </NavLink>
          <NavLink
            to='/products'
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-emerald-500 px-2 py-3 text-white hover:rounded-lg hover:bg-emerald-700'
                : 'w-full px-2 py-3 hover:rounded-lg hover:bg-emerald-400 hover:text-white'
            }
          >
            Products
          </NavLink>
          <NavLink
            to='/suppliers'
            className={({ isActive }) =>
              isActive
                ? 'w-full rounded-lg bg-emerald-500 px-2 py-3 text-white hover:rounded-lg hover:bg-emerald-700'
                : 'w-full px-2 py-3 hover:rounded-lg hover:bg-emerald-400 hover:text-white'
            }
          >
            Suppliers
          </NavLink>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
