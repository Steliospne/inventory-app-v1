import { ReactNode } from 'react';
import { ValidationErrors } from '../types/models';

export const formErrors = (
  error: ValidationErrors[keyof ValidationErrors],
): ReactNode => {
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

export const displayErrors = (message: string, status: string): ReactNode => {
  return (
    <p>
      <i className='text-3xl font-bold'>
        {message} <span className='text-red-500'>{status}</span>
      </i>
    </p>
  );
};
