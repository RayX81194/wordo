  import React, { useState } from 'react'
  const Navbar = ({theme, setTheme}) => {
    const handleClick = (e) => {
      setTheme(!theme);
    }
    return (
      <div className='flex w-[350px] sm:w-[600px] md:w-[700px] mt-8 mx-auto items-center justify-between'>
          <div className=''>
              <img className='w-[45px] h-[45px]' src="/logo.svg"></img>
          </div>
          <div className='flex gap-5'>
              <button onClick={handleClick}>
                {theme? <img className='w-[23px] h-[23px]' src="dark.svg"></img> : <img className='w-[23px] h-[23px]' src="light.svg"></img> }
              </button>
          </div>
      </div>
    )
  }

  export default Navbar