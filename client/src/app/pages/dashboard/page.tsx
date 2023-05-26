"use client"

import Background from "@/components/layout/Background"
import DashboardMenu from "@components/menu/dashboardmenu"

import Homeworks from "@/components/dashboard/sections/homeworks"
import Settings from "@/components/dashboard/sections/settings"
import Teams from "@/components/dashboard/sections/teams"
import Create from "@/components/dashboard/sections/create"
import Stats from "@/components/dashboard/sections/stats"
import Questionnaires from "@/components/dashboard/sections/questionnaires"


export default function Dashboard() {
    return (
        <>
            <DashboardMenu/>
            <Homeworks/>
        </>
    )
}