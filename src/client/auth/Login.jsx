import { useState } from 'react';
import Input from '../components/Input';
import { formErrors } from '../lib/errorUtil';
import { Form, useLoaderData } from 'react-router';

export const loader = async ({ params }) => {
  return params;
};

const Login = () => {
  const { message } = useLoaderData();
  const [formData, setFormData] = useState('');

  const handleInputChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [field]: value,
    });
  };
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Form
        method='POST'
        className='flex w-full max-w-lg flex-col gap-4 rounded-lg border-2 border-zinc-300 p-8 shadow-md'
      >
        <Input
          type='email'
          id='username'
          LabelText='Email:'
          value={formData.username}
          onChange={handleInputChange}
        />
        {message?.username && formErrors(message.username)}
        <Input
          type='password'
          id='password'
          LabelText='Password:'
          value={formData.password}
          onChange={handleInputChange}
        />
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
