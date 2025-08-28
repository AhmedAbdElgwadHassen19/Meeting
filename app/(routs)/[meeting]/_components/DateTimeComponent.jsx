import React from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'
function DateTimeComponent({date, timeSlots, handleDate, setSelectedTime , enableTimeSlots , selectedTime}) {
  return (
    <div>
      <div className="md:col-span-2 flex ">
        <div className="flex flex-col">
            <Calendar
                mode="single"
                disabled={{before: new Date()}}
                selected={date}
                onSelect={(d)=> handleDate(d)}
                className="rounded-md border border-[#bcbcbc]"
            />
        </div>
        <div className='flex flex-col p-4 overflow-auto gap-4 w-full max-h-64'>
            {timeSlots?.map((time)=>(
                <Button key={time} onClick={()=> setSelectedTime(time)} disabled={!enableTimeSlots} 
                className= {`border-black-700 ${time==selectedTime&&"bg-[#787c7c]"}`} variant={'outline'}>{time}</Button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default DateTimeComponent
