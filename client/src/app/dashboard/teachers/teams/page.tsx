
"use client"
import React, { useEffect } from "react";
import SortbyButton from "@/components/button/sortbybutton"
import styles from "./Teams.module.scss";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import TeamCard from "@/components/dashboard/Cards/TeamCard";
import TeamMainInformation from "@/components/dashboard/Teams/MainInformation";
import { useQuery } from "@tanstack/react-query";


// const Teams = () => {
//   const {data : session} = useSession()

//   const id = String(session?.user.user_id)


//     const [teams, setTeams] = React.useState([
//         {
//             "teamUUID": "",
//             "name": "",
//             "color": "",
//         }
//     ]);



//     useEffect(
//       () => {

//         const fetchData = async () => {
//             try {
//               const response = await fetch("http://localhost:8000/api/group/", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                   authorization : `bearer ${session?.user["acces token"]}`
//                 },
//                 body: JSON.stringify({id})
//               });
              
//               const responseData = await response.json();
//               console.log(responseData);
//               setTeams(responseData.teams); 
//             } 
      
//             catch (error) {
//               console.error(error);
//             }
//           };
//           console.log(session?.user["acces token"])
          
//           fetchData();

//     }, [session]);



//   return (
    

//         <div className="flex w-full flex-wrap pt-6 pb-16 gap-10">
          
//                 {teams.map((team,i) => (
//                     <TeamCard key={i} className={"justify-evenly"} team={team} i={i} isAddingTeam={false}/>
//                 ))}
//                 <TeamCard className={"justify-center gap-0"} team={{teamUUID: "", name: "", color: ""}} i={0} isAddingTeam={true}/>
//         </div>


// )
  
// };

// export default Teams;

interface Team { 
  uuid: string,
  name: string,
  color: string
}



export default function Teams(){
  const {data : session} = useSession()

  const { data : teams, isLoading } = useQuery<Team[]>({
    queryFn: () => fetch("http://localhost:8000/api/group/",
    {
      headers: {
        "Content-Type": "application/json",
        authorization : `bearer ${session?.user["acces token"]}`
      },
    }).then((res) => res.json())

  })

  if (isLoading || !teams) return <h1>Loading...</h1>



  return (
    <div>
      {teams.map((team) => (
        <h1 key={team.uuid}>{team.name}</h1>
      ))}
    </div>

  )
}
