import clsx from 'clsx'
import React from 'react'
import Delete from '@icons/Delete.svg'

interface user {
        first_name: string,
        last_name: string,
        email: string,
        is_teacher: boolean,
}


const fetchData = async (user : user, teamUUID : string) => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/teams/removeUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teamUUID: teamUUID,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                is_teacher: user.is_teacher,
            }),
          });
          
        const responseData = await response.json();
        console.log(responseData);
        return responseData.error;
          
        } 
  
        catch (error) {
          console.error(error);
        }
      };
  


      

export default function MemberCard({user, teamUUID} : {user : user, teamUUID : string}) {
        const [Display, setDisplay] = React.useState("");

        async function handleClick() {
                const error = await fetchData(user, teamUUID);
                error ? setDisplay("") : setDisplay("hidden")
        }

        return (
                <div 
                className={clsx(
                        'flex flex-row justify-between items-center',
                        'w-full h-12 px-8 py-4',
                        'hover:bg-accent-50',
                        Display,
                )}>
                        <span className='flex-1'>{user.first_name} {user.last_name}</span>
                        <span className='flex-1'>{user.is_teacher ? 'Teacher' : 'Student'}</span>
                        <span className='flex-1 text-xs'>{user.email}</span>
                        <div onClick={handleClick} className='flex-1 flex justify-end'>
                                <Delete className='w-6 hover:text-accent-500'/>
                        </div>
                </div>
  )
}
