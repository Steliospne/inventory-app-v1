import Input from '../components/Input';
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
        <Input type='email' id='username' LabelText='Email:' />
        {message?.username && formErrors(message.username)}
        <Input type='password' id='password' LabelText='Password:' />
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
