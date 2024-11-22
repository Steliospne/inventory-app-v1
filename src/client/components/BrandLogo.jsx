import { Box } from 'lucide-react';

const BrandLogo = () => {
  return (
    <div className='col-start-1 row-start-1 mr-auto flex h-[52px] items-center px-2 shadow'>
      <Box className='h-8 w-8 text-emerald-600' />
      <span className='ml-2 text-xl font-bold text-gray-900'>InventoryPro</span>
    </div>
  );
};

export default BrandLogo;
