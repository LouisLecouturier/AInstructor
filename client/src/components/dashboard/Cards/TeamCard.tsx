import React from 'react'
import Icon from '@icons/Plus.svg'
import clsx from 'clsx'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function TeamCard({className, team, i, isAddingTeam} : {className? : string, team : {teamUUID: string, name: string, color: string}, i: number, isAddingTeam: boolean}) {
    const {data : session} = useSession()

    const href = isAddingTeam && session?.user.is_teacher ? '/dashboard/teachers/teams/addTeam' : '/dashboard/teachers/teams/overview'
    
    return (
        <Link 
            key={i} 
            className={clsx(
                "w-64 h-64 bg-white shadow-lg rounded-xl flex items-center flex-col gap-5",
                className,
                "hover:bg-accent-50",
                "cursor-pointer"
            )}    
            href={{
                pathname: href,
                query: { id: team.teamUUID },
              }}              
        >
            { !isAddingTeam  ?
                <>
                    <div style={{backgroundColor: team.color }} className="w-28 h-28 rounded-xl"/>
                    <span className="text-xl font-bold text-dark-500">{team.name}</span>
                </>
                : <div className='w-1/2 h-1/2'><Icon/></div>
            }
        </Link>
    )
}
