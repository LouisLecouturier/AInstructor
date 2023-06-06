import { Button } from '@/components/Interactions/Button'
import Input from '@/components/Interactions/Forms/Input'
import clsx from 'clsx'
import React, { useState } from 'react'
import MemberCard from '../../Cards/MemberCard'
import HeaderListUserMapping from './header'
import { addUserMenu } from '@/store/displayMenu'
import AddUserMenu from '@/components/Interactions/Forms/AddUserMenu'


interface user {
    first_name: string,
    last_name: string,
    email: string,
    is_teacher: boolean,
}

export default function ListUserMapping({users, teamUUID} : {users : user[], teamUUID : string}) {
  const isAddUserMenuDisplayed = addUserMenu(state => state.isDisplay)
  
  return (
    <div className='h-96 w-full max-w-[800px] rounded-xl bg-white shadow-sm'>

      { isAddUserMenuDisplayed ? 
        <AddUserMenu teamUUID={teamUUID}/>
      :
        <div className='flex flex flex-col'>
              <HeaderListUserMapping />
              <div className='flex h-full w-full rounded-b-xl overflow-auto flex-col'>
                  {users.map(
                    (user : user, i : number) => (
                      <MemberCard key={i} teamUUID={teamUUID} user={user}/>
                    )
                  )}
              </div>
        </div>

      }
    </div>
  )
}
