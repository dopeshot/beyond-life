"use client"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import logo from '../../../../assets/logo/logo.png'
import { SideNavBarButton } from "../SideNavBarButton/SideNavBarButton"

export type SideNavBarElementId =
  "testator" | "marriage-status" | "heirs"

export type LastWillSideNavBarProps = {
  activeElement: SideNavBarElementId,
  setActiveElement: (id: SideNavBarElementId) => void,
}


export const LastWillSideNavBar: React.FC<LastWillSideNavBarProps> = ({
  activeElement,
  setActiveElement = (activeId) => { }
}) => {
  const router = useRouter()
  console.log(router.asPath)

  const sideBarElements: {
    id: SideNavBarElementId,
    title: string,
    description?: string,
  }[] = [
      {
        id: "testator",
        title: "Erblasser",
        description: "Persönliche Daten des Erblassers",
      },
      {
        id: "marriage-status",
        title: "Familienstand",
        description: "Beziehungsstatus, Art des Testaments, Daten des Ehepartners",
      },
      {
        id: "heirs",
        title: "Erben",
        description: "Erben und deren Anteile",
      }
    ]

  const onClickElement = (id: SideNavBarElementId) => {
    console.log(id)
  }

  return (
    <div className="w-96 bg-yellow h-screen">
      <div className="px-10 pt-4 pb-20" >
        <Image src={logo} alt="logo" width={160} />
      </div>
      <div className="flex flex-col">
        {sideBarElements.map((element, index) => (
          <SideNavBarButton key={index} id={element.id} title={element.title} description={element.description} isActive={activeElement === element.id ? "active" : "inactive"} onClick={(id: SideNavBarElementId) => onClickElement(id)} />
        ))}
      </div>
    </div>
  )
}