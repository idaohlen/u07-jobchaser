'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { logout } from '@/store/slices/authSlice';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, Tooltip } from '@heroui/react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";

import ThemeSwitcher from '@/components/ThemeSwitcher';
import BookmarkedJobs from '@/components/BookmarkedJobs';
import MobileMenu from '@/components/MobileMenu';

export default function Header() {
  const router = useRouter();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered className='fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900' isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Button
          className='font-bold text-inherit text-lg'
          as={Link}
          color='primary'
          href='/'
          variant='light'
        >
          JobChaser
        </Button>
      </NavbarBrand>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden sm:flex'><Button variant='light' onPress={() => router.push('/jobs')}>Jobs</Button></NavbarItem>

        {/* User account */}
        <Dropdown>
          <DropdownTrigger>
            <Button className='hidden sm:flex' variant='light' startContent={<Icon icon='material-symbols:account-circle' className='text-2xl pointer-events-none flex-shrink-0'/>}>
            { isAuthenticated ? user?.name : 'Log In or Sign Up' }
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Account">
            { isAuthenticated
              ? (
                  <DropdownItem key="account-logout" onPress={() => dispatch(logout())}>Log Out</DropdownItem>
              ) : (
                <>
                  <DropdownItem key="account-signin" onPress={() => router.push('/signin')}>Log In</DropdownItem>
                  <DropdownItem key="account-signup" onPress={() => router.push('/signup')}>Sign Up</DropdownItem>
                </>
              )
            }
          </DropdownMenu>
        </Dropdown>

        {/* Display bookmarked jobs */}
        <NavbarItem>
          <BookmarkedJobs />
        </NavbarItem>

        {/* Theme switcher toggle */}
        <NavbarItem>
          <Tooltip content={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} showArrow={true}>
            {/* Wrapper around ThemeSwitcher required for tooltip to work */}
            <div>
              <ThemeSwitcher />
            </div>
          </Tooltip>
        </NavbarItem>

      </NavbarContent>
      
      {/* Mobile menu  */}
      <MobileMenu closeMenu={() => setIsMenuOpen(false)} />
    </Navbar>
  )
}