"use client"

import Background from "@/components/layout/Background"
import DashboardMenu from "@components/menu/dashboardmenu"

import Homeworks from "@/components/dashboard/sections/homeworks"
import Settings from "@/components/dashboard/sections/settings"
import Teams from "@/components/dashboard/sections/teams"
import Import from "@/components/dashboard/sections/import"
import Stats from "@/components/dashboard/sections/stats"
import Questionnaires from "@/components/dashboard/sections/questionnaires"

import { SectionSelectStore, UserStore } from "@/store/store"

import Purple from "@blob/purple.svg"


function DashBoardSectionRendering(){
    const section = SectionSelectStore((state) => state.sectionName);
    const typeUser = UserStore((state) => state.typeUser);
    switch(section){
        case "Homeworks":
            return <Homeworks/>
        case "Settings":
            return <Settings/>
        case "Teams":
            return <Teams/>
        case "Import":
            return <Import/>
        case "Stats":
            return <Stats/>
        case "Questionnaires":
            return <Questionnaires/>
        default:
            return typeUser == "Student" ? <Homeworks/> : <Questionnaires/>
    }
}




export default function Dashboard() {
    return (
        <>
            <Purple className="fixed -z-10 -right-1/4 -bottom-1/4 w-2/3 h-2/3"/>


            <DashboardMenu/>
            <DashBoardSectionRendering/>
           

            

        </>
    )
}