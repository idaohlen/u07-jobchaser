'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { logout } from '@/store/slices/authSlice';

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from '@iconify/react';

export default function AccountDropdown() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const menu = [
    {
      label: 'Log Out',
      authState: 'loggedIn',
      action() {
        dispatch(logout());
      }
    },
    {
      label: 'Log In',
      authState: 'loggedOut',
      action() {
        router.push('/signin')
      }
    },
    {
      label: 'Sign Up',
      authState: 'loggedOut',
      action() {
        router.push('/signup');
      }
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className='hidden sm:flex'
          variant='light'
          isIconOnly={isSmallScreen}
          startContent={<Icon icon='material-symbols:account-circle' className='text-2xl flex-shrink-0'/>}
        >
        <div className=' hidden md:flex'>{ isAuthenticated ? user?.name : 'Log In or Sign Up' }</div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Account">
      {menu.map(item => {
          if (isAuthenticated && item.authState === 'loggedOut') return null;
          if (!isAuthenticated && item.authState === 'loggedIn') return null;

          return (
            <DropdownItem
              key={item.label}
              onPress={() => { item.action() }}
              endContent={<Icon icon='material-symbols:chevron-right' className='text-xl flex-shrink-0'/>}
            >
              {item.label}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}