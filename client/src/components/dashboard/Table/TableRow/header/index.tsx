import { Button } from '@/components/Interactions/Button'
import Input from '@/components/Interactions/Forms/Input'
import clsx from 'clsx'
import React from 'react'
import { addUserMenu } from '@/store/displayMenu'


export default function HeaderListFieldMapping({nameField} : {nameField : string}) {
    const setDisplay = addUserMenu(state => state.setDisplay)
        
  return (
    <div className={clsx(
        'flex flex-row justify-between items-center w-full h-24 px-8',
        'border-b-2 border-accent-500 border-opacity-20 border-solid',
    )}>
        <span className='text-2xl font-bold'>{nameField}</span>

        <div className='w-1/2 flex gap-8 max-w-[500px] h-1/2'>
            <Input placeholder={'Search'} name={'Search'} borders />
            <Button className='' variant='accent' size='sm' onClick={() => setDisplay(true)} >Add</Button>
        </div>

      </div>
  )
}
