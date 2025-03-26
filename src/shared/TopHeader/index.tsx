'use client'
import Link from 'next/link'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Divider,
} from '@heroui/react'

import { ShoppingCart, Heart, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
//import { useRouter } from 'next/navigation';

const Header = () => {
  const currentRoute = usePathname()
  console.log('Router--->', currentRoute)
  return (
    <>
      <Navbar
        maxWidth="xl"
        classNames={{
          item: [
            'flex',
            'relative',
            'h-full',
            'items-center',
            "data-[active=true]:after:content-['']",
            'data-[active=true]:after:absolute',
            'data-[active=true]:after:bottom-3',
            'data-[active=true]:after:left-0',
            'data-[active=true]:after:right-0',
            'data-[active=true]:after:h-[2px]',
            'data-[active=true]:after:rounded-[2px]',
            'data-[active=true]:after:bg-primary',
          ],
        }}
      >
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">Exclusive</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          <NavbarItem isActive={currentRoute === '/'}>
            <Link aria-current="page" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === '/contact'}>
            <Link href="/contact">Contact</Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === '/about'}>
            <Link color="foreground" href="/about">
              About
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentRoute === '/signup'}>
            <Link color="foreground" href="/signup">
              Sign Up
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">
              <Input
                //label="Email"
                labelPlacement="outside"
                placeholder="What are you looking for?"
                endContent={
                  <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link href="#">
              <Heart />
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="#">
              <ShoppingCart />
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Divider className="my-4" />
    </>
  )
}
export default Header
