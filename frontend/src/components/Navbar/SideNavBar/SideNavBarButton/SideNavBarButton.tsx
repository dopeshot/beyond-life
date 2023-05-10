import React from "react"
import { fontPlusJakartaSans } from "../../../../services/font/font"
import { SideNavBarElementId } from "../LastWillSideNavBar/LastWillSideNavBar"

export type SideNavBarButtonProps = {
  id: SideNavBarElementId,
  title: string,
  description?: string,
  isActive: "active" | "inactive" | "disabled",
  onClick: (id: SideNavBarElementId) => void,
}

export const SideNavBarButton: React.FC<SideNavBarButtonProps> = ({
  id,
  title,
  description,
  isActive,
  onClick
}: SideNavBarButtonProps) => {
  return (
    <div className={`flex flex-col px-10 py-4 ${isActive === "active" ? "bg-black text-white" : "text-black"} ${fontPlusJakartaSans.className}`} onClick={() => onClick(id)}>
      <div className="text-xl font-bold h-7">
        {title}
      </div>
      <div className="text-sm h-10">
        {description}
      </div>
    </div>
  )
}