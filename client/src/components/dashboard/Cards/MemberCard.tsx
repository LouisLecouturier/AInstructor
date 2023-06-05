import clsx from 'clsx'
import React from 'react'
import Delete from '@icons/Delete.svg'

interface member {
        first_name: string,
        last_name: string,
        mail: string,
        is_teacher: boolean,
}


const fetchData = async (member : member, TeamUUID : string) => {
        try {
          const response = await fetch("http://localhost:8000/api/deleteUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: TeamUUID,
                first_name: member.first_name,
                last_name: member.last_name,
                mail: member.mail,
                is_teacher: member.is_teacher,
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
  


      

export default function MemberCard({member, TeamUUID} : {member : member, TeamUUID : string}) {
        const [Display, setDisplay] = React.useState("");

        async function handleClick() {
                const error = await fetchData(member, TeamUUID);
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
                        <span className='flex-1'>{member.first_name} {member.last_name}</span>
                        <span className='flex-1'>{member.is_teacher ? 'Teacher' : 'Student'}</span>
                        <span className='flex-1 text-xs'>{member.mail}</span>
                        <div onClick={handleClick} className='flex-1 flex justify-end'>
                                <Delete className='w-6 hover:text-accent-500'/>
                        </div>
                </div>
  )
}
