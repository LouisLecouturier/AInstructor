"use client"
import React, { useEffect } from "react";
import SortbyButton from "@/components/button/sortbybutton"
import TeamsList from "@/components/dashboard/sections/teams"
import styles from "./Teams.module.scss";
import clsx from "clsx";
import { UserStore } from "@/store/userStore";
import { json } from "stream/consumers";


const Teams = () => {
    const userType = UserStore(state => state.userType)
    const firstname = UserStore(state => state.firstname)
    const lastname = UserStore(state => state.lastname)

    const [teams, setTeams] = React.useState([
        {
            "group_id": "",
            "name": "",
            "color": "",
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch("http://localhost:8000/api/teams", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    is_teacher: userType == "teacher" ? true : false,
                }),
              });
              
              const responseData = await response.json();
              console.log(responseData);
              setTeams(responseData.teams);
                
              
            //   const membersArray = JSON.parse(responseData);
              // Mettre à jour l'état avec le tableau JavaScript
              
            } 
      
            catch (error) {
              console.error(error);
            }
          };
          fetchData();

    }, []);

  return (
    <div className={clsx(
        "flex-1 h-full flex overflow-auto pt-12 flex-col gap-6",
        styles.teams
    )}>
        <h1 className="text-6xl font-black">Teams</h1>
        <SortbyButton/>
        <TeamsList teams={teams}/>
    </div>
)
  
};

export default Teams;
