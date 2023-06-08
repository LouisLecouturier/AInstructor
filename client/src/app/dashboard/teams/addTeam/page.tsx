"use client"

import { Button } from '@/components/Interactions/Button';
import Input from '@/components/Interactions/Forms/Input'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'



const newTeam = async (name : string, description : string, color : string, id: string) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/teams/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        color,
        userID : id
      }),
    });
    
    const responseData = await response.json();
    console.log(responseData.error);
    return responseData.error;
   
  } 

  catch (error) {
    console.error(error);
  }
};


export default function AddTeam() {
  const {data : session} = useSession()

  const [IsError, setIsError] = React.useState(false);
  const id = String(session?.user.user_id)
  
  const router = useRouter();

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const color = formData.get("color") as string;

    const error = await newTeam(name, description, color, id);
    
    error ? setIsError(error) : router.push("/dashboard/teachers/teams");
    
  };

  const [users, setUsers] = React.useState([
    {
      first_name: "",
      last_name: "",
      email: "",
      is_teacher: false,
    },
  ]);

  return (
    <div className='py-12 flex overflow-auto h-full flex-col gap-8'>

      <h1 className='text-6xl font-black'>Create new team</h1>


      <div className='flex-1 flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-[800px] rounded-xl p-6 gap-4 shadow-sm bg-white'>

          <div className='flex w-full'>
            <span className='text-2xl font-bold text-dark-500'>Main information</span>
          </div>

          <div className='flex flex-row w-full flex-1 flex-wrap gap-8'>
              <div className='flex flex-col w-[200px] justify-between'>
                <div className='w-full flex items-start aspect-square flex-1'>
                  <div className='w-full rounded-xl aspect-square bg-accent-500'/>
                </div>
                <Input placeholder='#color' border={true} name={'color'} />
              </div> 

              <div className='flex flex-1 flex-col gap-4 justify-center'>
                <span className='text-xl font-semibold text-dark-500'>Name</span>
                <Input placeholder='...' border={true} width="w-full" name={'name'} />
                <span className='text-xl font-semibold text-dark-500'>Description</span>
                <Input placeholder='...' border={true} width="w-full" height="h-32" name={'description'} />
              </div>
          </div>


          <div className='flex w-full gap-4'>
            <Button className='' variant='accent' size='md' rounded='lg' type='submit'>Create</Button>
            {IsError && <span className='text-red-500'>Error</span>}
          </div>


        </form>
      </div>

      



    </div>
  )
}
