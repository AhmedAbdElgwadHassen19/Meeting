"use client"
import MeetingForm from './_components/MeetingFrom'
import PreviewMeeting from './PreviewMeeting'
import { useState } from 'react'
function CreateMeeting() {
  const [formValue, setFormValue] = useState()
  return (
    <div className='grid md:grid-cols-3 grid-cols-1'>
        <div>
            <MeetingForm setFormValue = {setFormValue}/>
        </div>

      <div className='col-span-2'>
          <PreviewMeeting formValue = {formValue}/>
      </div>
    </div>
  )
}

export default CreateMeeting
