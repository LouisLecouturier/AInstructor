"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { UserStore } from '@/store/userStore';
import clsx from 'clsx';
import MemberCard from '@/components/dashboard/Cards/MemberCard';
import Input from '@/components/Interactions/Forms/Input';
import { Button } from '@/components/Interactions/Button';
import ListFieldMapping from '@/components/dashboard/ListMapping/ListUserMapping';
import { addUserMenu } from '@/store/displayMenu';


function Delete(){

}

export default function TeamOverview({searchParams} : {searchParams : any}) {
  const userType = UserStore(state => state.userType)
  const firstname = UserStore(state => state.firstname)
  const lastname = UserStore(state => state.lastname)
  const isDisplay = addUserMenu(state => state.isDisplay)
  const id = UserStore(state => state.id)

  const [data, setData] = useState({
    name: "",
    users: [
      {
        first_name: "",
        last_name: "",
        email: "",
        is_teacher: false,
      }
    ],
  });

  useEffect(
    () => {

    console.log("fetching data")

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/teams/overview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamUUID : searchParams.id,
            userID : id,
            
          }),
        });
        
        const responseData = await response.json();


        setData({
          name: responseData.name,
          users: responseData.users,
        });
      } 

      catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userType, firstname, lastname, searchParams.id, isDisplay])






  return (

    <div className='pt-12 flex flex-col gap-8'>

      <h1 className='text-6xl font-black'>{data.name}</h1>
      <h2 className='text-3xl font-bold'>Overview</h2>

      <ListFieldMapping 
      users={data.users} 
      nameField="Members" 
      modelPrimaryKey={searchParams.id} 
      modelFieldList={data.users} 
      urlDeleteLine="http://127.0.0.1:8000/api/teams/removeUser"
      urlAddLine="http://127.0.0.1:8000/api/teams/addUser"
      placeholderPrimaryKeyElementAdd="Email"
      />

    </div>
  )
}

