'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Button, Tooltip } from '@heroui/react';
// import { Icon } from '@iconify/react';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import BookmarkedJobs from '@/components/BookmarkedJobs';
import MobileMenu from '@/components/MobileMenu';
import SearchBar from '@/components/SearchBar';
import AccountDropdown from '@/components/AccountDropdown';

export default function Header() {
  const { theme } = useTheme();
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

      <NavbarItem className='w-full'>
          <SearchBar />
        </NavbarItem>

      <NavbarContent justify='end'>
        {/* User account */}
        <AccountDropdown />

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