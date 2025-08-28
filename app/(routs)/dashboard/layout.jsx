import React from 'react'
import SidNavbar from './_components/SidNavbar'
import UserHeader from './_components/UserHeader'
import { Toaster } from "@/components/ui/sonner"
function Dashboardlayout({children}) {
  return (
    <div>
      <div> <SidNavbar/></div>
      <div className='md:ml-70'>
        <UserHeader/>
        <Toaster/>
        {children}
        </div>
    </div>
  )
}

export default Dashboardlayout


