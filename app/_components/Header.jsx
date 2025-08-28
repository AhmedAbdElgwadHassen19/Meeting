"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

function Header() {
  return (
    <div className='flex justify-between items-center p-3 shadow-md'>
        <div>
            <Image className="w-[70px] md:w-[100px]  rounded-full object-cover" width={50} height = {50}src="/logo.png" alt="logo" />
        </div>
    <ul className='hidden md:flex gap-4 font-bold'>
        <li className='text-teal-300 hover:text-cyan-500 transition-all duration-400 '>Product</li>
        <li className='text-teal-300 hover:text-cyan-500 transition-all duration-400 '>Pricing</li>
        <li className='text-teal-300 hover:text-cyan-500 transition-all duration-400 '>About Us</li>
        <li className='text-teal-300 hover:text-cyan-500 transition-all duration-400 '>Contact Us</li>
    </ul>
    <div>
      <LoginLink><Button className='bg-green-600 mr-3'>Login</Button></LoginLink>
      <RegisterLink><Button className='bg-amber-500'>Grt Started</Button></RegisterLink>
    </div>
    
    </div>
  )
}

export default Header