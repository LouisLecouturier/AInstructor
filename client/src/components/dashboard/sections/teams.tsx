"use client"

import SortbyButton from "@/components/button/sortbybutton"
import { UserStore } from "@/store/userStore"
import TeamCard from "../Cards/TeamCard"
import { useSession } from "next-auth/react"


export default function TeamsList({teams} : { teams : {teamUUID: string, name: string, color: string}[] }){

    const {data : session} = useSession()

    return (

            <div className="flex w-full flex-wrap pt-6 pb-16 gap-10">
                
                {teams.map((team,i) => (
                    <TeamCard key={i} className={"justify-evenly"} team={team} i={i} isAddingTeam={false}/>
                ))}

                { session?.user.is_teacher ? 
                    <TeamCard className={"justify-center gap-0"} team={{teamUUID: "", name: "", color: ""}} i={0} isAddingTeam={true}/> : null
                }
                    

            </div>

    )

}



