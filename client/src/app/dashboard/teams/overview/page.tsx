"use client"
import React, { useEffect, useState } from 'react'
import ListFieldMapping from '@/components/dashboard/ListMapping/ListUserMapping';
import { addUserMenu } from '@/store/displayMenu';
import { useSession } from 'next-auth/react';



export default function TeamOverview({searchParams} : {searchParams : any}) {

  const {data : session} = useSession()

  
  const userType = session?.user.is_teacher ? "teacher" : "student"
  const firstname = session?.user.first_name
  const lastname = session?.user.last_name
  const isDisplay = addUserMenu(state => state.isDisplay)
  const id = session?.user.user_id

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
        const response = await fetch("http://localhost:8000/api/teams/overview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization : `bearer ${session?.user["acces token"]}`

          },
          body: JSON.stringify({
            teamUUID : searchParams.id,
            userID : id
            
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

    if (session?.user['acces token']) fetchData();


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

