import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className='col-start-1 row-start-2 my-4 flex flex-col'>
      <NavLink
        to='/dashboard'
        className='w-full px-2 py-3 hover:rounded-lg hover:bg-emerald-200'
      >
        Dashboard
      </NavLink>
      <NavLink
        to='/categories'
        className='w-full px-2 py-3 hover:rounded-lg hover:bg-emerald-200'
      >
        Categories
      </NavLink>
      <NavLink
        to='/products'
        className='w-full px-2 py-3 hover:rounded-lg hover:bg-emerald-200'
      >
        Products
      </NavLink>
    </aside>
  );
};

export default Sidebar;
