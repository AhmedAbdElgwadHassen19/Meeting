"use client"
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RegisterLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useRouter } from 'next/navigation'


export default function Hero() {
  const {user} = useKindeBrowserClient()
  const router = useRouter()
  useEffect(() => {
    if(user){
      router.push('/dashboard')
    }
  })
  return (
    
      <div className='text-center mt-15 max-w-3xl m-auto'>
        <h1  className='text-emerald-600 text-[40px] md:text-[50px]'>Make scheduling effortless</h1>
        <p className='text-gray-500 text-[20px] mb-5'>out smart scheduling tool helps the perfect in seconds</p>
        <div>
            <RegisterLink><Button className='bg-green-600 mr-3 cursor-pointer'>Sing Up with Google</Button></RegisterLink>
            <RegisterLink><Button className='bg-amber-500 cursor-pointer'>Sing Up with Facebook</Button></RegisterLink>
        </div>
        
      </div>
      
    
  )
}
