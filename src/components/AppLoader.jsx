import React from 'react'

const AppLoader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
       <span
                className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent"
                role="status"
              ></span>
    </div>
  )
}

export default AppLoader
