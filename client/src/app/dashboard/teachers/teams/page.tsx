import React from "react";
import SortbyButton from "@/components/button/sortbybutton"
import TeamsList from "@/components/dashboard/sections/teams"

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


const Teams = () => {
  return (
    <div className="flex-1 h-full flex flex-col gap-6 pt-16">
        <h1 className="text-6xl px-20 font-black">Teams</h1>
        <SortbyButton className="px-20"/>
        <TeamsList teams={teams}/>
    </div>
)
  
};

export default Teams;
