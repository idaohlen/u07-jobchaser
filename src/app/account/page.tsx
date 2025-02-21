'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';

import { Button, Link, Card, CardBody } from '@heroui/react';

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <div className='page w-full max-w-[400px] mx-auto mt-12 pb-20'>
      <h1 className='mb-4'>My Account</h1>
      {
        isAuthenticated ? (
          <>
            <Card>
              <CardBody>
                <p><b>Name:</b> {user?.name}</p>
                <p><b>Email:</b> {user?.email}</p>
              </CardBody>
            </Card>
            <Button className='w-full mt-6' color='danger' onPress={() => dispatch(logout())}>Log Out</Button>
          </>
        ) : (
          <p>Please <Link onPress={() => router.push('/signin')}>log in</Link> to access this page.</p>
        )
      }
    </div>
  )
}