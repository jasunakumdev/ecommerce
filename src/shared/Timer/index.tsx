interface TimerDetailsProps {
  title: string
  value: string
}

interface TimerProps {
  days: string
  hours: string
  minutes: string
  seconds: string
}

const TimerDetails = ({ title, value }: TimerDetailsProps) => {
  return (
    <div className="font-medium pl-4">
      <div className="text-xs">{title}</div>
      <div className="text-2xl font-extrabold">{value}</div>
    </div>
  )
}

const Separator = () => {
  return <div className="font-medium pl-4 text-[#db4444] text-2xl">:</div>
}

const Timer = ({ days, hours, minutes, seconds }: TimerProps) => {
  return (
    <div className="flex items-center mt-4">
      <TimerDetails title="Days" value={days} />
      <Separator />
      <TimerDetails title="Hours" value={hours} />
      <Separator />
      <TimerDetails title="Minutes" value={minutes} />
      <Separator />
      <TimerDetails title="Seconds" value={seconds} />
    </div>
  )
}

export default Timer
