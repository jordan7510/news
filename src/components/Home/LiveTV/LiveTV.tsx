import React from 'react'
import ReactPlayer from 'react-player'

export default function LiveTV() {
  return (
    <div className='w-full'>
      <div className='border border-brand text-center rounded-md'>
        <p className='font-medium'>LIVE TV</p>
      </div>
      <div>
        <ReactPlayer
          width={96}
          src='https://www.youtube.com/watch?v=tzYu5VmQGIA'
          playing={true}
          muted={true}
          controls
        />
      </div>
    </div>
  )
}
