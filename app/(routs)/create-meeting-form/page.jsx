"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { getFirestore , setDoc , doc} from "firebase/firestore";
import { app } from '../dashboard/config/FirebaseConfig'
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import { useRouter } from 'next/navigation'

function Create_MeetingForm() {
    const [MeetingName, setMeetingName] = useState()
    const db = getFirestore(app);
    const {user} = useKindeBrowserClient()
    const router = useRouter()

    const onCreateMeeting = async()=> {
        
        await setDoc(doc(db, "Meeting",user.email), {
        meeting: MeetingName,
        email: user.email,
        userName: user.given_name+" "+ user.family_name
        }).then((resp=>{
            console.log('Document Saved');
            router.push("/dashboard")
        }))
    }
  return (
    <div  className='flex flex-col items-center gap-20 my-10'>
        <Image width={200} height={200} src="/logo.png" alt="logo" className='rounded-full object-cover'/>
        <div className='flex flex-col items-center gap-4 max-w-3xl'>
            <h2 className='text-[#039c96] text-3xl font-bold'>What is your Meeting About </h2>
            <p className='text-slate-400 '> Create your Meeting Hear</p>

            <div className="w-full">
                <label htmlFor="" className='text-slate-400 font-bold '>Meeting Name </label>
                <Input onChange= {(e)=> setMeetingName(e.target.value)} className='mt-4' placeholder ='Add your Meeting Hear' />
            </div>
            <Button onClick ={onCreateMeeting} disabled= {!MeetingName} className="w-full mt-2 text-white cursor-pointer">Create Meeting </Button>
        </div>
    </div>

  )
}

export default Create_MeetingForm
