export const formErrors = (error) => {
  if (Array.isArray(error))
    return error.map((error, index) => (
      <p key={index}>
        <i className='text-red-500'>{error}</i>
      </p>
    ));
  return (
    <p>
      <i className='text-red-500'>{error}</i>
    </p>
  );
};

export const displayErrors = (message, status) => {
  return (
    <p>
      <i className='text-3xl font-bold'>
        {message} <span className='text-red-500'>{status}</span>
      </i>
    </p>
  );
};
