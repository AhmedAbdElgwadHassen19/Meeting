"use client"
import Image from 'next/image'
import { useState , useEffect } from 'react'
import { format } from 'date-fns';
import DateTimeComponent from './DateTimeComponent'
import { Button } from '@/components/ui/button'
import UserForm from './UserForm'
import { app } from '../../dashboard/config/FirebaseConfig'
import { getFirestore ,  doc, setDoc} from "firebase/firestore";
import { toast } from 'sonner'
const MeetingDateTime = ({eventInfo, meetingInfo}) => {

  const [date, setDate] = useState(new Date())
  const [timeSlots , setTimeSlots] = useState()
  const [enableTimeSlots, setEnableTimeSlots] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [step, setStep] = useState(1);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [note, setNote] = useState();
  const db = getFirestore(app);

    useEffect(() => {
      const interval = Number(eventInfo?.duration?.split(" ")[0]);
      if (interval) createTimeSlots(interval);
  }, [eventInfo]);
  
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
  }
  const handleDate = (date) =>{
    setDate(date);
    const dateFormat = format(date, 'EEEE').toLowerCase();
    if(meetingInfo?.dayAvailable?.[dateFormat]){
      setEnableTimeSlots(true);
    } else{
        setEnableTimeSlots(false);
    }
  }

  const handleScheduledMeeting = async() => {
        await setDoc(doc(db, "ScheduledMeeting", String(Date.now())), {
        meeting: meetingInfo?.meeting,
        meetingEmail: meetingInfo.email,
        selectedTime : selectedTime,
        selectedDate : date,
        formatedDate:format(date, "PPP"),
        formatedTime:format(date , "t"),
        duration: eventInfo?.duration,
        name: name,
        email: email,
        note: note
    }).then(resp =>{
      toast("Meeting Scheduled Successfully")
    })
  }
 return (
    <div className='p-4 md:p-7 shadow-lg m-2 md:m-5 border-t-4 border-t-cyan-800 md:mx-10 mt-10 md:mt-20'>
        <Image width={100} height={100} src="/logo.png" alt="logo" className='rounded-full object-cover'/>

            <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
                <div className="p-4 border-b md:border-b-0 md:border-r border-[#bcbcbc]">
                    <div>
                        <h2 className='font-bold text-2xl md:text-[28px]'>{meetingInfo?.meeting}</h2>
                        <h2>{eventInfo?.meetingName || "Enter Meeting Name"}</h2>
                    </div>

                </div>

                <div className="md:col-span-2 w-full">
                    { step==1 ? <DateTimeComponent date={date} timeSlots={timeSlots} handleDate={handleDate}  
                    enableTimeSlots={enableTimeSlots} setSelectedTime={setSelectedTime} selectedTime={selectedTime}/> : <UserForm setName={setName} setEmail={setEmail} setNote={setNote}/> }
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              {step === 2 && <Button onClick={() => setStep(1)} variant="outline">Back</Button>}

              {step === 1 ? 
                <Button disabled={!selectedTime || !date} onClick={() => setStep(step + 1)}>Next</Button>
                : 
                <Button onClick={handleScheduledMeeting} disabled={!name || !email || !note}>Schedule</Button>
              } 
            </div>
    </div>
  )
}

export default MeetingDateTime
