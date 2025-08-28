"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { collection, query, where, getDocs , getFirestore ,deleteDoc , doc, getDoc } from "firebase/firestore";
import { app } from '../../config/FirebaseConfig';
import { Clock, Copy, MapPin, Settings } from 'lucide-react';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function MeetingEventList({search , setSearch}) {
    const [eventList, setEventList] = useState([])
    const db = getFirestore(app);
    const {user} = useKindeBrowserClient()
    const [meetingList, setMeetingList] = useState()

    useEffect(()=>{
        user && getEventList()
        user&&getMeetingInfo()
    },[user])

    const getEventList = async () => {
    const q = query(collection(db, "Event"), where("createdBy", "==", user?.email));

    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
    });
    setEventList(events); // تحديث القائمة بالكامل بعد الحصول على الأحداث الجديدة
};

const onDeleteEvent = async (event) => {
    await deleteDoc(doc(db, "Event", event.id)).then(() => {
        toast("Meeting Has Been Deleted");
        // تحديث القائمة بعد الحذف
        setEventList((prevEventList) => prevEventList.filter((e) => e.id !== event.id));
    });
};

    const getMeetingInfo = async () => {
    if (!user?.email) return;
    const docRef = doc(db, "Meeting", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        setMeetingList(data);
        console.log("Meeting Info:", data);
    } else {
        console.log("No meeting found for this user.");
    }
};

    const onCopyHandle = (event) => {
    if (!meetingList?.meeting || !event?.meetingName) {
        toast('Meeting info not available.');
        return;
    }
    const meetingURL = `${process.env.NEXT_PUBLIC_BASE_URL}/${meetingList.meeting}/${event.data}`;
    navigator.clipboard.writeText(meetingURL);
    toast('Link Copied');
};

const filterEventList = eventList.filter(event => event.meetingName.toLowerCase().includes(search.toLowerCase()));

return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {filterEventList.length>0?filterEventList?.map((event)=>(
            <div key={event.id} className='border shadow-md border-t-8 border-[#FEBF30] p-5 m-3'>

                <div className="flex justify-end cursor-pointer">
                    <DropdownMenu>
                        <DropdownMenuTrigger><Settings/></DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-white shadow-2xl p-3'>
                            <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer' onClick={()=>onDeleteEvent(event)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>


                <h2 className='font-bold text-2xl rounded-lg'>{event.meetingName}</h2>

                <div className="flex justify-between items-center mt-3">
                    <h2 className='flex gap-2'><Clock/> {event.duration}</h2>
                    <h2 className='flex gap-2'><MapPin/> {event.program?.name}</h2>
                </div>

                <hr className='mt-2 '/>
                <div>
                    <h2
                        onClick={() => { onCopyHandle(event); }}
                        className={`text-blue-500 flex mt-5 items-center gap-2 text-sm ${!event?.meetingName ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ pointerEvents: !event?.meetingName ? 'none' : 'auto' }}
                    >
                        <Copy/> Copy Link
                    </h2>
                </div>
            </div>
        ))
        :<h2>No Event Yet</h2>
    }
    </div>
)
}

export default MeetingEventList
