"use client"
import { days } from '../../_utils/daysList'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState , useEffect } from 'react'
import { doc, updateDoc , getFirestore , getDoc } from "firebase/firestore";
import { app } from '../config/FirebaseConfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'
function availability() {
  
  const [dayAvailable , setDayAvailable] = useState({
    saturday: false,
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  })
  const [starttime, setStartTime] = useState()
  const [endtime, setEndTime] = useState()
  const {user} = useKindeBrowserClient()
  const db = getFirestore(app);


  const onHandle = (day, value)=>{
    setDayAvailable({
      ...dayAvailable,
      [day]:value
    })
    console.log(dayAvailable);
  }

  const HandleClick = async()=>{
    const docRef = doc(db, "Meeting", user?.email);
    await updateDoc(docRef, {
    dayAvailable : dayAvailable,
    starttime: starttime,
    endtime: endtime
    }).then(()=>{
      toast("Data Updated Successfully")
    }).catch((error)=>{
      console.error("Error updating document: ", error);
      toast.error("Error updating document: " + error.message);
});
    console.log(dayAvailable , starttime , endtime);
  }

  useEffect(()=>{
    user && getMeetingData()
  }, [user])
  const getMeetingData =async ()=>{
    const docRef = doc(db, "Meeting", user?.email);
    const docSnap = await getDoc(docRef);
    const results = docSnap.data();
    setDayAvailable(results?.dayAvailable);
    setStartTime(results?.starttime);
    setEndTime(results?.endtime);
  }

  return (
    <div className='p-7'>
      <h2 className='text-4xl font-bold mt-8 text-[#039b95]'>Available Time And Date</h2>
      <hr className='mt-3 text-slate-400'/>
      <div className='grid grid-cols-2 md:grid-cols-4 mt-6'>

        {days?.map((item)=>(
          <div>
            <h2><Checkbox checked={dayAvailable[item.day]? true : false} onCheckedChange={(e)=>onHandle(item.day,e)}/> {item.day}</h2>
          </div>
        ))}
      </div>

      <div className='flex gap-10 mt-10'>
        <div>
          <h2>Start Time</h2>
          <Input defaultValue={starttime} onChange={(e)=> setStartTime(e.target.value)} type="time"/>
        </div>
        
        <div>
          <h2>End Time</h2>
          <Input defaultValue={endtime} onChange={(e)=> setEndTime(e.target.value)} type="time"/>
        </div>
      </div>

      <Button onClick={HandleClick}  className="text-white mt-8">Save</Button>
    </div>
  )
}

export default availability
