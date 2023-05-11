"use client"
import React from "react"
import { fontPlusJakartaSans } from "../../../../services/font/font"
import { SideBarElementId } from "../LastWillSideBar/LastWillSideBar"

export type SideBarButtonProps = {
  id: SideBarElementId,
  title: string,
  description?: string,
  isActive: "active" | "inactive" | "disabled",
  setActiveElement: (id: SideBarElementId) => void,
}

export const SideBarButton: React.FC<SideBarButtonProps> = ({
  id,
  title,
  description,
  isActive,
  setActiveElement
}: SideBarButtonProps) => {

  const handleClick = (id: SideBarElementId) => {
    // if (isActive === "disabled") return  // TODO: implement disabled
    setActiveElement(id)
  }

  return (
    <div onClick={() => handleClick(id)} className={`flex justify-between items-center px-6 py-3 select-none ${isActive === "active" ? "bg-black text-white" : isActive === "inactive" ? "text-black" : "text-black text-opacity-50"} ${fontPlusJakartaSans.className}`}>
      <div className={`flex flex-col gap-1 w-5/6`}>
        <div className="text-base font-bold h-5">
          {title}
        </div>
        <div className="text-xs font-medium h-8">
          {description}
        </div>
      </div>
      <div className={`h-6 w-6 bg-gray-500`} />
    </div>
  )
}