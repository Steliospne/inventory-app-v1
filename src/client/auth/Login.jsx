import { formErrors } from '../lib/errorUtil';
import { Form, useLoaderData } from 'react-router-dom';

export const loader = async ({ params }) => {
  return params;
};

const Login = () => {
  const { message } = useLoaderData();
  console.log(message);
  return (
    <div className='flex h-full items-center justify-center'>
      <Form
        method='post'
        className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
      >
        <div className='flex flex-col'>
          <label htmlFor='username' className='text-lg font-medium'>
            Email
          </label>
          <input
            type='email'
            name='username'
            id='username'
            autoComplete='username'
            required
            className='mt-4 h-10 rounded-lg px-4 py-5 focus:outline-offset-1'
          />
        </div>
        {message?.username && formErrors(message.username)}
        <div className='mt-4 flex flex-col'>
          <label htmlFor='password' className='text-lg font-medium'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            className='mt-4 h-10 rounded-lg px-4 py-5 focus:outline-offset-1'
          />
        </div>
        {message?.password && formErrors(message.password)}
        <button
          type='submit'
          className='rounded-lg bg-emerald-300 py-2 font-semibold hover:bg-emerald-200'
        >
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
