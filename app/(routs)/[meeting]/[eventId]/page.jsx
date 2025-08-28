"use client"
import  { useEffect, useState } from 'react'
import MeetingDateTime from '../_components/MeetingDateTime'
import {  collection, query, where, getFirestore ,  doc, getDoc, getDocs } from "firebase/firestore";
import { app } from '../../dashboard/config/FirebaseConfig';

const SharedEventMeeting = ({params}) => {
  const db = getFirestore(app);
  const [meetingInfo , setMeetingInfo] = useState();
  const [eventInfo , setEventInfo] = useState();




  useEffect(() => {
        params&&getMeetingAndEventDetails();
    }, [params]);

  const getMeetingAndEventDetails = async () => {

    const q = query(collection(db, "Meeting"), where("meeting", "==", params.meeting));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("Meeting Data:", doc.data());
        setMeetingInfo(doc.data());
  });

    // جلب بيانات الحدث
    const eventRef = doc(db, "Event", params.eventId);
    const eventSnap = await getDoc(eventRef);
    setEventInfo(eventSnap.data());
  }


  return (
    <div>
      <MeetingDateTime eventInfo={eventInfo} meetingInfo={meetingInfo} />
    </div>
  )
}


export default SharedEventMeeting
