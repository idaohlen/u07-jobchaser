'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { login } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

import { Input, Button, Alert } from '@heroui/react';

interface Inputs {
  email: string;
  password: string;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  // Submit login form
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    const user = users.find(user => user.email === data.email && user.password === data.password);
    if (user) {
      dispatch(login({
        id: user.id,
        email: user.email,
        name: user.name
      }));
      router.push('/account');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <div className='page max-w-[400px] mx-auto mt-12 pb-20'>
      <h1>Log In</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 mt-5'>

        <Input id='email' label='Email' type='email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          errorMessage={errors.email?.message}
          isInvalid={errors.email ? true : false}
        />

        <Input
          id='password' label='Password' type='password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
          errorMessage={errors.password?.message}
          isInvalid={errors.password ? true : false}
        />

        <Button type='submit' color='primary' className=' self-end'>Login</Button>

        <Alert
        color='primary'
        title='Log in using one of the following:'
        description={
          (
            <ul className='list-disc ml-4 m-2'>
              <li>demo@demo.demo, demo1234</li>
              <li>admin@demo.demo, admin1234</li>
            </ul>
          )}
        />
      </form>
    </div>
  )
}

