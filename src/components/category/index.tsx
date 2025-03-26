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

import { Listbox, ListboxItem } from '@heroui/react'

const CATEGORY = [
  "Women's Fashion",
  "Men's Fashion",
  'Electronics',
  'Home & Lifestyle',
  'Medicine',
  'Sports & Outdoor',
  "Baby's & Toys",
  'Groceries & Pets',
  'Health & Beauty',
]
export const ListboxWrapper = ({ children }) => (
  <div className="w-full max-w-[260px]  px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
)

const Category = () => {
  const currentRoute = usePathname()
  console.log('Router--->', currentRoute)
  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
        {CATEGORY.map((item, index) => {
          return <ListboxItem key={index}>{item}</ListboxItem>
        })}
      </Listbox>
    </ListboxWrapper>
  )
}
export default Category
