import { Button } from '@/components/Interactions/Button'
import Input from '@/components/Interactions/Forms/Input'
import clsx from 'clsx'
import React, { useState } from 'react'
import Line from '../../Cards/MemberCard'
import HeaderListFieldMapping from './header'
import { addUserMenu } from '@/store/displayMenu'
import AddObjectModelMenu from '@/components/Interactions/Forms/AddUserMenu'


interface user {
    first_name: string,
    last_name: string,
    email: string,
    is_teacher: boolean,
}


export default function ListFieldMapping(
  {
    users,
    modelPrimaryKey,
    modelFieldList,
    nameField,
    urlDeleteLine,
    urlAddLine,
    placeholderPrimaryKeyElementAdd,
  } : {
    users : user[], 
    modelPrimaryKey : string, 
    modelFieldList : Record<string, string|boolean>[],
    nameField : string,
    urlDeleteLine : string,
    urlAddLine : string,
    placeholderPrimaryKeyElementAdd : string,
  }
) {
  const isAddUserMenuDisplayed = addUserMenu(state => state.isDisplay)
  
  return (
    <div className='h-96 w-full max-w-[800px] rounded-xl bg-white shadow-sm'>
      { isAddUserMenuDisplayed ? 

        <AddObjectModelMenu modelPrimaryKey={modelPrimaryKey} nameField={nameField} urlAddLine={urlAddLine} placeholder={placeholderPrimaryKeyElementAdd}/>
      :
        <div className='flex flex flex-col'>
          <HeaderListFieldMapping nameField={nameField} />
          <div className='flex h-full w-full rounded-b-xl overflow-auto flex-col'>
              {modelFieldList.map(
                  (modelFieldLine : Record<string, string|boolean>, i : number) => (
                    <Line 
                      key={i} 
                      modelPrimaryKey={modelPrimaryKey} 
                      modelFieldLine={modelFieldLine}
                      urlDeleteLine={urlDeleteLine}
                    />
                  )
              )}
          </div>
        </div>

      }
    </div>
  )
}
