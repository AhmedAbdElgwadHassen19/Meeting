'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UpcomingMeeting from './_components/UpcomingMeeting'
import { collection, query, where, getDocs , getFirestore } from "firebase/firestore";
import { app } from '../config/FirebaseConfig';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect , useState } from "react";
import { format } from "date-fns";


function ScheduledMeeting() {
  const db = getFirestore(app);
  const {user} = useKindeBrowserClient()
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(()=> {
    user&&GetUpcomingMeeting()
  },[user])

  const GetUpcomingMeeting = async () => {
    const q = query(collection(db, "ScheduledMeeting"), where("meetingEmail", "==", user.email));
    const querySnapshot = await getDocs(q);

    const meetings = []
    querySnapshot.forEach((doc) => {
      meetings.push(doc.data());
    })
    setUpcomingMeetings(meetings)
  }

  const filterMeeting=(type)=>{
        if(type=="Upcoming"){
      return  upcomingMeetings.filter(item=>item?.formatedTime>=format(new Date(),"t"))
        }
        else{
          return  upcomingMeetings.filter(item=>item?.formatedTime<=format(new Date(),"t"))
        }
    }

  return (
    <div className = "p-10">
      <h1 className='text-[24px] font-bold p-3'>Scheduled Meeting</h1>
      <hr className='text-slate-500 p-2'/>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="Past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="Upcoming">
          <UpcomingMeeting upcomingMeetings={filterMeeting("Upcoming")} />
        </TabsContent>
        <TabsContent value="Past">
          <UpcomingMeeting upcomingMeetings={filterMeeting("Past")}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ScheduledMeeting
