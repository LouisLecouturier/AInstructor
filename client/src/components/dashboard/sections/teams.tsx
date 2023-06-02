"use client"

import SortbyButton from "@/components/button/sortbybutton"
import { UserStore } from "@/store/userStore"

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




export default function TeamsList({teams} : { teams : {id: number, name: string, members: any[], color: string}[] }){
    const typeUser = UserStore(state => state.userType)
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
                    <div className="flex-[0_0_16rem] h-64 bg-white shadow-lg rounded-xl flex justify-evenly items-center flex-col gap-5">
                        <span className="text-xl font-bold text-dark-500">Add team</span>
                    </div>
                    

            </div>

        </div>
    )

}



