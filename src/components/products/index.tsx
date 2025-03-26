'use client'
import {
  Card,
  CardFooter,
  Image,
  Button,
  CardHeader,
  Chip,
} from '@heroui/react'
import { Heart, Star } from 'lucide-react'
import Link from 'next/link'

export default function Product() {
  return (
    <Link href="/product/1">
      <Card radius="none" className="border-none max-w-[200px] shadow-none">
        <CardHeader className="absolute z-10 !items-start justify-between">
          <Chip color="danger" className="rounded text-xs font-normal">
            -40%
          </Chip>
          <h4 className="text-white font-medium text-large">
            <Heart />
          </h4>
        </CardHeader>
        <Image
          alt="Woman listing to music"
          className="z-0 w-full h-full object-cover rounded-none"
          height={200}
          src="https://heroui.com/images/hero-card.jpeg"
          width={200}
        />
        {/* <div className="overflow-hidden py-0   bottom-9 w-[calc(100%)] shadow-small z-10">
          <Button
            className="text-tiny text-white bg-black"
            color="default"
            radius="none"
            size="md"
            variant="flat"
            fullWidth
          >
            Add To Cart
          </Button>
        </div> */}
        <CardFooter className="gap-3 flex flex-col items-start">
          <div className="flex">
            <p className="font-semibold text-default-500 text-small">
              Product Name
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold text-small text-danger-500">$10</p>
            <p className="font-semibold text-default-400 text-small line-through">
              $15
            </p>
          </div>

          <div className="flex gap-3">
            <div className="flex gap-1">
              <Star size="20px" fill="yellow" />
              <Star size="20px" fill="yellow" />
              <Star size="20px" />
              <Star size="20px" />
              <Star size="20px" />
            </div>

            <p className="text-default-400 text-small">(20)</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
