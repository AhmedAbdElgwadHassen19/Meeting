"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"

function Header() {
  return (
    <div className="shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <div>
          <Image
            className="w-[70px] md:w-[100px] rounded-full object-cover"
            width={50}
            height={50}
            src="/logo.png"
            alt="logo"
          />
        </div>

        <div>
          <LoginLink> <Button className="bg-green-600 mr-3">Login</Button> </LoginLink>
          <RegisterLink> <Button className="bg-amber-500">Get Started</Button> </RegisterLink>
        </div>
      </div>
    </div>
  )
}

export default Header
