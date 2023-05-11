"use client"
import Image from "next/image"
import React from "react"
import logo from '../../../../assets/logo/logo.png'
import { SideBarButton } from "../SideBarButton/SideBarButton"

export type SideBarElementId =
  "testator" | "marriageStatus" | "heirs" | "inheritance" | "succession" | "final"

export type LastWillSideBarProps = {
  activeElement: SideBarElementId,
  setActiveElement: (id: SideBarElementId) => void,
}

const sideBarElements: {
  id: SideBarElementId,
  title: string,
  description?: string,
  disabled: boolean,
}[] = [
    {
      id: "testator",
      title: "Erblasser",
      description: "Persönliche Daten des Erblassers",
      disabled: false,
    },
    {
      id: "marriageStatus",
      title: "Familienstand",
      description: "Beziehungsstatus, Art des Testaments, Daten des Ehepartners",
      disabled: true,
    },
    {
      id: "heirs",
      title: "Erben",
      description: "Erben und deren Anteile",
      disabled: true,
    },
    {
      id: "inheritance",
      title: "Erbschaft",
      description: "Erbschaftsgegenstände",
      disabled: true,
    },
    {
      id: "succession",
      title: "Erbfolge",
      description: "Stammbaum und Verteilung",
      disabled: true,
    },
    {
      id: "final",
      title: "Zusammenfassung",
      description: "Überprüfung und Abschreiben",
      disabled: true,
    }
  ]

export const LastWillSideBar: React.FC<LastWillSideBarProps> = ({
  activeElement,
  setActiveElement = (activeId) => { }
}) => {

  return (
    <div className="w-80 bg-yellow h-screen">
      <div className="px-6 pt-4 pb-20" >
        <Image src={logo} alt="logo" width={160} />
      </div>
      <div className="flex flex-col">
        {sideBarElements.map((element, index) => (
          <SideBarButton
            key={index}
            id={element.id}
            title={element.title}
            description={element.description}
            isActive={activeElement === element.id ? "active" : element.disabled ? "disabled" : "inactive"}
            setActiveElement={setActiveElement}
          />
        ))}
      </div>
    </div>
  )
}