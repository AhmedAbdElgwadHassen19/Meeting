"use client"
import React from 'react'
import {LogoutLink, useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs"
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function UserHeader() {
    const {user} = useKindeBrowserClient()
  return  user&&(
    <div>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex items-center float-right p-3'>
            <Image className="rounded-full w-[50px] md:w-[50px]" width={50} height = {50}src={user?.picture} alt="logo" />
            <ChevronDown/>
          </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <LogoutLink>Logout</LogoutLink>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </div>
  )
}

export default UserHeader
