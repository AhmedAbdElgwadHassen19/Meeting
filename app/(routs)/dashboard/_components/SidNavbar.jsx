"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { Plus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { menu } from "./Menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import imgLogo from "../../../../public/logo.png"
function SidNavbar() {
  const path = usePathname()
  const [currentPath, setCurrentPath] = useState(path)

  useEffect(() => {
    path && setCurrentPath(path)
  }, [path])


  const SidebarContent = () => (
    <div className="p-5 py-15">
      <div className="flex flex-col items-center">
        <Image
          className="w-[70px] md:w-[100px]  rounded-full object-cover"
          width={50}
          height={50}
          src={imgLogo}
          alt="logo"
        />
      </div>

      <Link href={"/create-meeting"}>
        <Button className="mt-5 flex items-center w-full gap-2 cursor-pointer">
          <Plus /> Create
        </Button>
      </Link>

      <div>
        {menu.map((item) => (
          <Link href={item.path} key={item.id || item.name}>
            <Button
              className={`text-zinc-950 w-full gap-4 mt-3 border border-[#FEBF30] bg-transparent hover:bg-[#FEBF30] ${
                currentPath == item.path && "bg-[#FEBF30]"
              }`}
            >
              <item.icon /> {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <>
      
      <div className="hidden md:block w-65 h-screen  fixed bg-[#e6f7f6]">
        <SidebarContent />
      </div>

      
      <div className="block md:hidden p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 ">
              <Menu /> Open
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-[#e6f7f6] p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default SidNavbar
