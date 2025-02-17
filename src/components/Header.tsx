import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { logout } from '@/store/slices/authSlice';

import Link from 'next/link'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@heroui/react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <Navbar className='fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900'>
      <NavbarBrand>
        <Button as={Link} color='primary' href='/' variant='light' className='font-bold text-inherit text-lg'>
          JobChaser
        </Button>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem className=''>
          <Link href="/jobs">Jobs</Link>
        </NavbarItem>
        { isAuthenticated
          ? (
            <>
              {user?.name}
              <Button color='primary' variant='flat' onPress={() => dispatch(logout())}>
                Logout
              </Button>
            </>
          )
          : (
            <>
              <NavbarItem className='hidden lg:flex'>
                <Link href="/signin">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color='primary' href='/signup' variant='flat'>
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )
        }
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}