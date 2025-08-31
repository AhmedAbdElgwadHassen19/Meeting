import React from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'

function DateTimeComponent({date, timeSlots, handleDate, setSelectedTime , enableTimeSlots , selectedTime}) {
  return (
    // التغيير هنا: استخدمنا flex-col كأساس، ثم md:flex-row للشاشات الأكبر
    <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* التقويم */}
        <div className="flex justify-center">
            <Calendar
                mode="single"
                disabled={{before: new Date()}}
                selected={date}
                onSelect={(d)=> handleDate(d)}
                className="rounded-md border border-[#bcbcbc]"
            />
        </div>
        {/* قائمة الأوقات */}
        {/* أضفنا overflow-auto و max-h-[] للتحكم في السكرول */}
        <div className='flex flex-col gap-3 w-full overflow-auto max-h-[350px] p-2 border-t md:border-t-0 md:border-l border-gray-200'>
            {timeSlots?.map((time)=>(
                <Button key={time} onClick={()=> setSelectedTime(time)} disabled={!enableTimeSlots} 
                className= {`border-black-700 ${time==selectedTime&&"bg-[#787c7c] text-white"}`} variant={'outline'}>{time}</Button>
            ))}
        </div>
    </div>
  )
}

export default DateTimeComponent
