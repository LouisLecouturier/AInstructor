"use client"

import Input from '@/components/Interactions/Forms/Input'
import ListUserMapping from '@/components/dashboard/ListMapping/ListUserMapping'
import React from 'react'

export default function AddTeam() {
  const [members, setMembers] = React.useState([
    {
      first_name: "",
      last_name: "",
      mail: "",
      is_teacher: false,
    },
  ]);

  return (
    <div className='py-12 flex overflow-auto h-full flex-col gap-8'>

      <h1 className='text-6xl font-black'>Create new team</h1>

      <div className='flex flex-col w-full max-w-[800px] rounded-xl p-6 gap-4 shadow-sm bg-white'>

        <div className='flex w-full'>
          <span className='text-2xl font-bold text-dark-500'>Main information</span>
        </div>

        <div className='flex flex-row w-full flex-1 flex-wrap gap-8'>

          <div className='flex flex-col w-[200px] h-full gap-4 aspect-square '>
            <div className='w-full flex items-center flex-1'>
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


      </div>


      <ListUserMapping TeamUUID={"test"} members={members}/>


    </div>
  )
}
