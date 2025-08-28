"use client"
import { Input } from '@/components/ui/input'
import MeetingEventList from './_components/MeetingEventList'
import { useState } from 'react'

function MeetingType() {
const [search, setSearch] = useState("")
  return (
    <div className='p-5'>
      <div className='flex flex-col gap-5'>
        <h1 className='font-bold text-3xl gap-5 mt-5'>Your Meeting List</h1>
        <Input onChange={(e) => setSearch(e.target.value)} className="max-w-xs border-slate-500" placeholder="Search Event" value={search}  />
        <hr className='text-slate-600'/>
      </div>
      <MeetingEventList search={search} setSearch={setSearch} />
    </div>
  )
}

export default MeetingType
