
"use client"
import React, { useEffect } from "react";
import SortbyButton from "@/components/button/sortbybutton"
import TeamsList from "@/components/dashboard/sections/teams"
import styles from "./Teams.module.scss";
import clsx from "clsx";
import { useSession } from "next-auth/react";


const Teams = () => {
  const {data : session} = useSession()
  console.log(session)

  const id = String(session?.user.user_id)


    const [teams, setTeams] = React.useState([
        {
            "teamUUID": "",
            "name": "",
            "color": "",
        }
    ]);



    useEffect(
      () => {

        const fetchData = async () => {
          console.log('fetch')
            try {
              const response = await fetch("http://127.0.0.1:8000/api/teams/", {

                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  authorization : `bearer ${session?.user["acces token"]}`
                },

                body: JSON.stringify(
                  {
                    id : id,
                  }
                ),
              });
              
              const responseData = await response.json();
              console.log(responseData);
              setTeams(responseData.teams); 
            } 
      
            catch (error) {
              console.error(error);
            }
          };
          console.log(session?.user["acces token"])
          
          if (session?.user["acces token"]) fetchData();

    }, [session]);

  return (
    <div className={clsx(
        "flex-1 h-full flex overflow-auto pt-12 flex-col gap-6",
        styles.teams
    )}>

        <h1 className="text-6xl font-black">
          Teams
        </h1>

        <SortbyButton/>

        <TeamsList teams={teams}/>

    </div>
)
  
};

export default Teams;
