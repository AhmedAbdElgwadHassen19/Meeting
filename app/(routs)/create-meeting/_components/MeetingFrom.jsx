"use client"
import { ChevronLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { programs } from '../../_utils/program'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { app } from '../../dashboard/config/FirebaseConfig'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function MeetingForm({setFormValue}) {
  const [program, setProgram] = useState(null)
  const [meetingName, setMeetingName] = useState("")
  const [duration, setDuration] = useState("")
  const [programURL, setProgramURL] = useState("")
  const db = getFirestore(app);
  const {user}= useKindeBrowserClient()
  const router = useRouter()


  useEffect(()=>{
    setFormValue({
      program:program,
      meetingName:meetingName,
      duration:duration,
      programURL:programURL
    })
  },[programURL,duration,meetingName,program])

const onCreateMeeting =async ()=>{
  const data = Date.now().toString()
  await setDoc(doc(db, "Event", data), {
    data:data,
    program:program,
    meetingName:meetingName,
    duration:duration,
    programURL:programURL,
    meetingId:doc(db,"Meeting" , user?.email),
    createdBy:user?.email
}).then((resp)=>{
  toast("New Meeting Add")
  router.push("/dashboard/meeting-list")
})
}


  return (
    <div className='p-3 '>
      <Link href={'/dashboard'}><h1 className='flex gap-2'><ChevronLeft/> Cancel</h1></Link>
      
      <div>
        <h1 className='mt-4 font-bold text-2x1'>Create New Meeting</h1>
      </div>
      <hr className='text-red-500 mt-4'/>

      <div className='flex flex-col gap-4 my-4'>
        <h2>Meeting Name</h2>
        <Input onChange={(e)=> setMeetingName(e.target.value)} placeholder='Meeting Name' value={meetingName} />
      </div>

      <div className='flex flex-col gap-4 my-4'>
        <h2>Duration*</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='max-w-30'>
              {duration || "30 Min"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["15 Min", "30 Min", "45 Min", "60 Min"].map((d) => (
              <DropdownMenuItem key={d} onClick={() => setDuration(d)}>{d}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <h2>Choose Programs</h2>
        <div className="grid grid-cols-3 gap-3">
          {programs.map((item) => (
            <div
              key={item.name}
              onClick={() => setProgram(item)}
              className={`cursor-pointer hover:bg-gray-600 border-slate-200 p-2 flex flex-col justify-center border items-center ${program && program.name === item.name ? "bg-[#3f4242]" : ""}`}
            >
              {item.icon && (
                <Image width={70} height={70} src={item.icon.startsWith('/') ? item.icon : `/${item.icon}`} alt='image' />
              )}
            </div>
          ))}
        </div>

        {program && (
          <div className='flex flex-col gap-4 my-4'>
            <h2>Add {program.name} URL</h2>
            <Input onChange={e => setProgramURL(e.target.value)}  placeholder='URL' value={programURL}  />
          </div>
        )}
      </div>

      <Button disabled={!(meetingName && duration && programURL && program)} className="text-white w-full mt-10 cursor-pointer" onClick={()=>onCreateMeeting()}> Create </Button>
    </div>
  )
}

export default MeetingForm
