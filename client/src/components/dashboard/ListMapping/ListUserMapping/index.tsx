import { Button } from '@/components/Interactions/Button'
import Input from '@/components/Interactions/Forms/Input'
import clsx from 'clsx'
import React, { useState } from 'react'
import MemberCard from '../../Cards/MemberCard'
import HeaderListUserMapping from './header'
import { addUserMenu } from '@/store/displayMenu'
import AddUserMenu from '@/components/Interactions/Forms/AddUserMenu'


interface member {
    first_name: string,
    last_name: string,
    mail: string,
    is_teacher: boolean,
}

export default function ListUserMapping({members, TeamUUID} : {members : member[], TeamUUID : string}) {
  const isAddUserMenuDisplayed = addUserMenu(state => state.isDisplay)
  
  return (
    <div className='h-96 w-full max-w-[800px] rounded-xl bg-white shadow-sm'>

      { isAddUserMenuDisplayed ? 
        <AddUserMenu TeamUUID={TeamUUID}/>
      :
        <div className='flex flex flex-col'>
              <HeaderListUserMapping />
              <div className='flex h-full w-full rounded-b-xl overflow-auto flex-col'>
                  {members.map(
                    (member : member, i : number) => (
                      <MemberCard key={i} TeamUUID={TeamUUID} member={member}/>
                    )
                  )}
              </div>
        </div>

      }
    </div>
  )
}
