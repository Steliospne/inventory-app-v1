import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className='flex flex-col col-start-1 row-start-2 my-4'>
      <NavLink
        to='/dashboard'
        className='w-full hover:rounded-lg hover:bg-emerald-200 px-2 py-3'
      >
        Dashboard
      </NavLink>
      <NavLink
        to='/products'
        className='w-full hover:rounded-lg hover:bg-emerald-200 px-2 py-3'
      >
        Products
      </NavLink>
    </aside>
  );
};

export default Sidebar;
