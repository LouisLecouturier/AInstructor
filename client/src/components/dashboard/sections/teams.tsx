"use client"

import SortbyButton from "@/components/button/sortbybutton"
import { UserStore } from "@/store/userStore"
import TeamCard from "../Cards/TeamCard"


export default function TeamsList({teams} : { teams : {teamUUID: string, name: string, color: string}[] }){

    const typeUser = UserStore(state => state.userType)

    function addTeam(){ console.log("add team")}
    function clickTeam(){ console.log("click team")}

    return (

            <div className="flex w-full flex-wrap pt-6 pb-16 gap-10">
                
                {teams.map((team,i) => (
                    <TeamCard key={i} className={"justify-evenly"} ClickHandler={clickTeam} team={team} i={i} isAddingTeam={false}/>
                ))}

                { typeUser === "teacher" ? 
                    <TeamCard className={"justify-center gap-0"} ClickHandler={addTeam} team={{teamUUID: "", name: "", color: ""}} i={0} isAddingTeam={true}/> : null
                }
                    

            </div>

    )

}



