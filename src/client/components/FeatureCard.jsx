const FeatureCard = ({ icon, title, description, children }) => {
  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      {icon && (
        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100'>
          {icon}
        </div>
      )}
      <h3 className='mb-2 text-lg font-semibold text-gray-900'>{title}</h3>
      {children}
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};

export default FeatureCard;
