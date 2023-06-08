import React from 'react'

export default function SortbyButton({className}: {className?: string}) {
  return (
    <div className={className}>
      <div className='flex items-center gap-3'>
          <span className='font-medium text-lg'>Sort by</span>

          <div className='w-24 h-8 bg-white flex items-center p-3 border-solid border gap-2 border-dark-50 shadow-sm relative rounded-full'>
            <span className='font-bold text-lg'>Teams</span>
            <div className='w-3 h-1 bg-dark-500 absolute right-1'/>
          </div>

      </div>
    </div>
  )
}
