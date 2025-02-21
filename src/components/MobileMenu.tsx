'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';

import { NavbarMenu, NavbarMenuItem, Button } from "@heroui/react";

export default function MobileMenu({closeMenu}: {closeMenu: () => void}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const menu = [
    {
      label: 'Jobs',
      action() {
        router.push('/jobs');
      }
    },
    {
      label: 'My Account',
      authState: 'loggedIn',
      action() {
        router.push('/account');
      }
    },
    {
      label: 'Log In',
      authState: 'loggedOut',
      action() {
        router.push('/signin');
      }
    },
    {
      label: 'Sign Up',
      authState: 'loggedOut',
      action() {
        router.push('/signup');
      }
    },
    {
      label: 'Log Out',
      authState: 'loggedIn',
      action() {
        dispatch(logout());
      }
    }
  ];
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <NavbarMenu>
      {menu.map(item => {
        if (isAuthenticated && item.authState === 'loggedOut') return null;
        if (!isAuthenticated && item.authState === 'loggedIn') return null;

        return (
          <NavbarMenuItem key={item.label}>
            <Button
              variant='light'
              radius='sm'
              className='w-full'
              onPress={() => {
                item.action();
                closeMenu();
              }}
            >
              {item.label}
            </Button>
          </NavbarMenuItem>
        )
      })}
    </NavbarMenu>
  )
}