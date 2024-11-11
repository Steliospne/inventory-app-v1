import {
  isRouteErrorResponse,
  useLocation,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { Bug, CircleX } from 'lucide-react';
import { displayErrors } from '../../lib/errorUtil';

const ErrorBoundary = ({ initialError }) => {
  const fromPath = useLocation();
  const error = fromPath
    ? fromPath.state.error
    : initialError
      ? initialError
      : useRouteError();
  const navigate = useNavigate();
  const isResponse =
    Object.getPrototypeOf(error) == Object.getPrototypeOf(new Response());

  let displayError = null;
  if (isRouteErrorResponse(error) || isResponse) {
    switch (error.status) {
      case 500:
        displayError = displayErrors('Server Error', error.status);
        break;

      case 404:
        displayError = displayErrors('Page not found', error.status);
        break;

      case 401:
        displayError = displayErrors('Unauthorized access', error.status);
        break;
    }
  } else {
    displayError = displayErrors('Unexpected error', error.name);
    console.error(error);
  }

  return (
    <div className='flex h-svh flex-col items-center justify-center'>
      <div className='flex flex-col gap-4 rounded-lg bg-emerald-600 p-4'>
        <p className='font-semibold text-zinc-100'>SYSTEM MESSAGE</p>
        <div className='max-w- flex flex-col rounded-lg bg-white p-10'>
          <div className='flex items-center justify-center gap-4 px-4 py-8'>
            <CircleX className='scale-150' stroke='red' />
            {displayError}
          </div>
          <p className='max-w-[45ch]'>
            If you are seeing this, contact the assigned IT team for assistance.
          </p>
          <button
            onClick={() => navigate('/')}
            className='mt-4 rounded-lg bg-emerald-400 p-2 hover:rounded-lg hover:bg-emerald-200'
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
