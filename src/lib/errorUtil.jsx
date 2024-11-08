export const formErrors = (array) => {
  return array.map((error, index) => (
    <p key={index}>
      <i className='text-red-500'>{error}</i>
    </p>
  ));
};
