import React from 'react'

const Main = () => {
  return (
<main className=" flex h-[100vh] w-[100vw] flex-col justify-center items-center gradient-box drop-shadow-md">
<div className="space-y-6 text-center">
<div className=" sm:text-6xl text-5xl text-gray-300 font-semibold ">Welcome</div>
<div className='flex text-center justify-center items-center '><a href='/register' className='flex text-center justify-center items-center  inline-block  w-[180px] h-[60px] bg-slate-200 text-[20px] font-semibold rounded-[30px]'>Get Started</a></div>
</div>
</main>
  )
}

export default Main