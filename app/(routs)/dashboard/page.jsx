"use client"
import  { useEffect } from 'react'
import { doc, getDoc ,getFirestore} from "firebase/firestore";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import { app } from './config/FirebaseConfig';
import MeetingType from './meeting-list/page';



function Dashboard() {
  
  const db = getFirestore(app);
  const {user} = useKindeBrowserClient()
  
  useEffect(()=>{
      MeetingRegistered()
    },[user])

const MeetingRegistered = async ()=>{

    const docRef = doc(db, "meeting", user.email);
    const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

  return (
    <div>
      <h1><MeetingType/></h1>
    </div>
  )
}

export default Dashboard

