import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Button as={Link} color='primary' href='/' variant='light' className='font-bold text-inherit text-lg'>
          JobChaser
        </Button>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <NavbarItem className=''>
          <Link href="/jobs">Jobs</Link>
        </NavbarItem>
        <NavbarItem className='hidden lg:flex'>
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='/signup' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}