import React, { useRef } from 'react'
import Input from '../Input'
import { Button } from '../../Button'
import { addUserMenu } from '@/store/displayMenu'


const fetchData = async (email : string, teamUUID : string) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/teams/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamUUID: teamUUID,
        email: email,
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

export default function AddUserMenu({teamUUID} : {teamUUID : string}) {
  const [isError, setIsError] = React.useState(false);

  const setDisplay = addUserMenu(state => state.setDisplay)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('Email') as string;

    const error = await fetchData(email, teamUUID);

    if (error == false) { setDisplay(false) }
    setIsError(error);
  };


  return (
    <form className='h-full w-full justify-between flex flex-col p-12' onSubmit={handleSubmit}>

          <div className='w-full'>
              <h2 className='text-2xl font-bold'>Add new member</h2>
          </div>
          
          <div className='flex flex-col w-full gap-2'>
              <span className='text-lg font-bold'>Enter email address</span>
              <Input placeholder={'Email'} type="email" name={'Email'} border={true} />
              {isError && <span className='text-red-500'>Error</span>}
          </div>

          <div className='flex'>
              <Button type='submit'>Save</Button>
              <Button size="sm" onClick={() => setDisplay(false)} variant='tertiary'>Cancel</Button>
          </div>

    </form>
  )
}
