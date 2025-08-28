"use client"
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Calendar } from "@/components/ui/calendar"
import { useState , useEffect } from 'react'
import { Button } from '@/components/ui/button'
export default function PreviewMeeting({formValue}) {
    const [date, setDate] = useState(new Date())
    const [timeSlots , setTimeSlots] = useState()

    useEffect(() => {
  const interval = Number(formValue?.duration?.split(" ")[0]);
  if (interval) createTimeSlots(interval);
}, [formValue]);


  const createTimeSlots=(interval)=>{
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? 'PM' : 'AM';
      return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
    });
    setTimeSlots(slots);
    console.log(slots);
    }
  return (
    <div className='p-7 shadow-md m-5'>
        <Image width = {100} height ={100} src="/logo.png" alt="logo" className='rounded-full object-cover'/>

            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="mt-7 border-r border-[#bcbcbc] pl-[20px]">
                    <div>
                        <h2 className='font-bold text-[28px]'>Meeting Name</h2>
                        <h2>{formValue?.meetingName || "Enter Meeting Name"}</h2>
                    </div>
                    
                    <div className='flex items-center gap-2 mt-3'>
                        <Clock/> <h2>{formValue?.duration || "Choose Min"} </h2>
                    </div>

                    <div className='flex items-center gap-2 mt-2'>
                        <MapPin/><h2>{formValue?.program?.name || "Choose Program"}</h2>
                    </div>

                    <div>
                        <Link href={formValue?.programURL?formValue?.programURL:'#'} className='text-blue'>{formValue?.programURL?formValue?.programURL:'URL'}</Link>
                    </div>
                </div>

            <div className="md:col-span-2 flex ">
                <div className="flex flex-col">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border border-[#bcbcbc]"
                    />
                    </div>
                    <div className='flex flex-col p-4 overflow-auto gap-4 w-full max-h-64'>
                        {timeSlots?.map((time)=>(
                            <Button variant={'outline'} className= "border-[#039b95]">{time}</Button>
                        ))}
                    </div>
                </div>

            </div>
            
    </div>
)
}
