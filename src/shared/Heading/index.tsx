interface HeadingProps {
  title: string
  size?: string
  className?: string
}

const Heading = ({ title, size, className = '' }: HeadingProps) => {
  if (size === 'small') {
    return (
      <div className="flex items-center my-4 text-[#db4444]">
        <div className="w-5 h-10 rounded bg-[#db4444]"></div>
        <div className="font-medium pl-4">{title}</div>
      </div>
    )
  }

  return (
    <div className="flex my-4">
      <div className={`text-3xl font-bold ${className}`}>{title}</div>
    </div>
  )
}
export default Heading
