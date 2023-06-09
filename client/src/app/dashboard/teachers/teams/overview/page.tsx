"use client"
import React, { use, useEffect, useState } from 'react'
import ListFieldMapping from '@/components/dashboard/ListMapping/ListUserMapping';
import { addUserMenu } from '@/store/displayMenu';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/Interactions/Button';
import TeamMainInformation from '@/components/dashboard/Teams/MainInformation';
import getTeamInformation from './hook';
import deleteTeam from './deletehook';
import { useRouter } from 'next/navigation';

interface user {
  first_name: string,
  last_name: string,
  email: string,
  is_teacher: boolean,
}



export default function TeamOverview({searchParams} : {searchParams : any}) {

  const {data : session} = useSession()
  const router = useRouter()

  
  const userType = session?.user.is_teacher ? "teacher" : "student"
  const firstname = session?.user.first_name
  const lastname = session?.user.last_name
  const isDisplay = addUserMenu(state => state.isDisplay)
  const id = String(session?.user.user_id)
  const token = String(session?.user['acces token'])

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


  async function handleClick() {
    const error = await deleteTeam(searchParams.id,id, token);
    if (!error) {
      router.push("/dashboard/teachers/teams")
      
    }
  }

  useEffect(() => {
    console.log("fetching data");
    if (token) {
      (async () => {
        let data: { name: string; users: user[] };
        data = await getTeamInformation(searchParams.id, id, token);
        setData({
          name: data.name,
          users: data.users,
        });
      })();
    }
  }, [userType, firstname, lastname, searchParams.id, isDisplay, session]);
  





  return (

    <div className='flex flex-col gap-8'>

      <div className='w-full flex justify-between items-center'>
        <h1 className='text-6xl font-black'>{data.name}</h1>
        <Button onClick={() => handleClick()} variant='secondary'>
          Delete
        </Button>      
      </div>

      <h2 className='text-3xl font-bold'>Overview</h2>

      <TeamMainInformation/>

      <ListFieldMapping 
      users={data.users} 
      nameField="Members" 
      modelPrimaryKey={searchParams.id} 
      modelFieldList={data.users} 
      urlDeleteLine="http://localhost:8000/api/group/removeUser"
      urlAddLine="http://localhost:8000/api/group/addUser"
      placeholderPrimaryKeyElementAdd="Email"
      />


    </div>
  )
}

