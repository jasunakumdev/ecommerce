'use client'
import { Button, Divider } from '@heroui/react'
import Product from '@/components/products'
import Category from '@/components/category'
import EmblaCarousel from '@/components/carousel'
import { EmblaOptionsType } from 'embla-carousel'
import image1 from '/images/product-images/image-1.jpg'
import Heading from '@/shared/Heading'
import Timer from '@/shared/Timer'
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Laptop,
  Watch,
  Camera,
  Gamepad,
  Headphones,
} from 'lucide-react'
import CategoryBox from '@/shared/CategoryBox'

const OPTIONS: EmblaOptionsType = {}
const SLIDES = [
  '/images/product-images/image-1.avif',
  '/images/product-images/image-2.avif',
  '/images/product-images/image-3.webp',
  '/images/product-images/image-4.jpg',
  '/images/product-images/image-5.jpg',
]

export default function Home() {
  return (
    <div className="container mx-auto px-32">
      <div className="flex flex-wrap justify-center w-full">
        <div className="w-full lg:w-1/4">
          <Category />
        </div>
        <div className="w-full lg:w-3/4 mb-9">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
      </div>
      {/* Today's Deals */}
      <div className="flex">
        <Heading title="Today's Deals" size="small" />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex">
          <Heading title="Flash Sales" />
          <div className="flex pl-4">
            <Timer days="03" hours="12" minutes="19" seconds="56" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            isIconOnly
            aria-label="Like"
            className="rounded-full bg-gray-200"
            size="sm"
          >
            <ArrowLeft />
          </Button>
          <Button
            isIconOnly
            aria-label="Like"
            className="rounded-full bg-gray-200"
            size="sm"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-10 overflow-hidden">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>

      <div className="flex justify-center my-5">
        <Button size="md" className="bg-[#db4444] text-white rounded">
          View All Products
        </Button>
      </div>
      <Divider className="my-5" />

      {/* Category */}
      <div className="flex">
        <Heading title="Categories" size="small" />
      </div>
      <div className="flex justify-between items-center">
        <Heading title="Browse By Category" />
        <div className="flex gap-2">
          <Button
            isIconOnly
            aria-label="Like"
            className="rounded-full bg-gray-200"
            size="sm"
          >
            <ArrowLeft />
          </Button>
          <Button
            isIconOnly
            aria-label="Like"
            className="rounded-full bg-gray-200"
            size="sm"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mt-2 overflow-hidden">
        <CategoryBox icon={<Smartphone />} text="Phone" onClick={() => {}} />
        <CategoryBox icon={<Laptop />} text="Computer" onClick={() => {}} />
        <CategoryBox icon={<Watch />} text="Phone" onClick={() => {}} />
        <CategoryBox icon={<Camera />} text="Phone" onClick={() => {}} />
        <CategoryBox
          icon={<Headphones />}
          text="HeadPhones"
          onClick={() => {}}
        />
        <CategoryBox icon={<Gamepad />} text="HeadPhones" onClick={() => {}} />
      </div>
      <Divider className="mt-10" />

      {/* This Month */}
      <div className="flex">
        <Heading title="This month" size="small" />
      </div>

      <div className="flex justify-between items-center">
        <Heading title="Best Selling Products" />
        <Button size="md" className="bg-[#db4444] text-white rounded">
          View All
        </Button>
      </div>

      <div className="flex gap-4 justify-center mt-5 overflow-hidden">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>

      <div className=" gap-4 grid grid-cols-2 justify-center mt-5 overflow-hidden bg-black text-white h-100 rounded-sm">
        <div className="grid grid-flow-row">Hello</div>
        <div className="grid grid-flow-row">Hi</div>
      </div>

      {/* <div className="flex gap-1">
        <Button
          isIconOnly
          aria-label="Like"
          className="rounded-full bg-gray-200"
        >
          <ArrowLeft />
        </Button>
        <Button
          isIconOnly
          aria-label="Like"
          className="rounded-full bg-gray-200"
        >
          <ArrowRight />
        </Button>
      </div>

      <div className="flex">
        <Heading title="Today's Deals" size="small" />
      </div>
      <Heading title="Browse By Category" />

      <div className="flex">
        <Timer days="03" hours="12" minutes="19" seconds="56" />
      </div>

      <div className="my-4">
        <Button size="lg" className="bg-[#db4444] text-white rounded">
          View All Products
        </Button>
      </div> */}
    </div>
  )
}
