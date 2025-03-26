'use client'
import { Card } from '@heroui/react'
import { Smartphone } from 'lucide-react'
import React, { ReactNode } from 'react'

interface CategoryBoxProps {
  text: string
  onClick: () => void
  icon: ReactNode
}

const CategoryBox = ({ icon, text, onClick }: CategoryBoxProps) => {
  return (
    <Card
      radius="sm"
      onPress={onClick}
      className="w-43 h-35 border-1 flex items-center justify-center hover:bg-[#db4444] hover:text-white border-gray-500 shadow-non"
    >
      {icon}
      <p className="text-small mt-2">{text}</p>
    </Card>
  )
}

export default CategoryBox
