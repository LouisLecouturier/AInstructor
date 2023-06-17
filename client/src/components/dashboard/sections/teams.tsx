<<<<<<< HEAD
import SortbyButton from "@/components/button/sortbybutton"
import { UserStore } from "@/store/store"

const teams = [
    {
        "id": 1, 
        "name": "English - 4B",
        "members": [],
        "color": "#8338EC",
    },
    {
        "id": 2, 
        "name": "Mathematics",
        "members": [],
        "color": "#FFBE0B",
    },
    {
        "id": 3, 
        "name": "French - 5G",
        "members": [],
        "color": "#3A86FF",
    },
    {
        "id": 4, 
        "name": "History",
        "members": [],
        "color": "#8338EC",
    },
    {
        "id": 4, 
        "name": "Humanities",
        "members": [],
        "color": "#FF006E",
    },
    {
        "id": 4, 
        "name": "Physics and Chemistry",
        "members": [],
        "color": "#FFBE0B",
    },
    {
        "id": 4, 
        "name": "Life on campus",
        "members": [],
        "color": "#FF006E",
    },
]




function TeamsList({teams} : { teams : {id: number, name: string, members: any[], color: string}[] }){
    const typeUser = UserStore(state => state.typeUser)
    return (
        <div className="flex flex-1 overflow-hidden w-full flex-col">

            <div className="flex w-full h-1 px-16">
                    <div className="flex-1 bg-dark-400 h-1 rounded-full"/>
                </div>

            <div className="flex w-full flex-wrap overflow-auto px-20 pt-6 pb-16 flex-1 gap-10">
                
                {teams.map((team,i) => (

                    <div key={i} className="flex-[0_0_16rem] h-64 bg-white shadow-lg rounded-xl flex justify-evenly items-center flex-col gap-5">
                        <div style={{backgroundColor: team.color }} className="w-28 h-28 rounded-xl"/>
                        <span className="text-xl font-bold text-dark-500">{team.name}</span>
                    </div>

                ))}
                {typeUser == "Teacher" ? 
                    <div className="flex-[0_0_16rem] h-64 bg-white shadow-lg rounded-xl flex justify-evenly items-center flex-col gap-5">
                        <span className="text-xl font-bold text-dark-500">Add team</span>
                    </div>
                    : null
                }


            </div>

        </div>
=======
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

>>>>>>> origin/FullStack
    )

}



<<<<<<< HEAD

export default function Teams() {
    return (
        <div className="flex-1 h-full flex flex-col gap-6 pt-16">
            <h1 className="text-6xl px-20 font-black">Teams</h1>
            <SortbyButton className="px-20"/>
            <TeamsList teams={teams}/>
        </div>
    )
}
=======
>>>>>>> origin/FullStack
