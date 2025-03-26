'use client'
import { Button } from '@heroui/react'

interface ButtonProps {
  text: string
  onClick: () => void
}

const LargeButton = ({ text, onClick }: ButtonProps) => {
  return (
    <Button size="lg" className="bg-[#db4444]" onPress={onClick}>
      {text}
    </Button>
  )
}

export default LargeButton
