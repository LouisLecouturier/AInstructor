"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { UserStore } from '@/store/userStore';
import clsx from 'clsx';
import MemberCard from '@/components/dashboard/Cards/MemberCard';
import Input from '@/components/Interactions/Forms/Input';
import { Button } from '@/components/Interactions/Button';
import ListUserMapping from '@/components/dashboard/ListMapping/ListUserMapping';
import { addUserMenu } from '@/store/displayMenu';

export default function TeamOverview({searchParams} : {searchParams : any}) {
  const userType = UserStore(state => state.userType)
  const firstname = UserStore(state => state.firstname)
  const lastname = UserStore(state => state.lastname)
  const isDisplay = addUserMenu(state => state.isDisplay)

  const [data, setData] = useState({
    name: "",
    members: [
      {
        first_name: "",
        last_name: "",
        mail: "",
        is_teacher: false,
      }
    ],
  });

  useEffect(() => {
    console.log("fetching data")
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: searchParams.id,
            userType: userType,
            firstName: firstname,
            lastName: lastname,
          }),
        });
        
        const responseData = await response.json();
        const membersArray = JSON.parse(responseData.members);
        // Mettre à jour l'état avec le tableau JavaScript
        setData({
          name: responseData.name,
          members: membersArray,
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
      <ListUserMapping TeamUUID={searchParams.id}members={data.members}/>
    </div>
  )
}

