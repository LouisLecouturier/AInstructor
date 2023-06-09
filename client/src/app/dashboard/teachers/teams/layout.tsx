import SortbyButton from '@/components/button/sortbybutton'
import clsx from 'clsx'
import React from 'react'
import styles from './Teams.module.scss'

export default function Teams({children}  : {children: React.ReactNode}) {
  return (
    <div className={clsx( "flex-1 h-full flex flex-col gap-6", styles.teams)}>
        <h1 className="text-5xl font-black">Teams</h1>
        <SortbyButton/>
        {children}
    </div>
  )
}
