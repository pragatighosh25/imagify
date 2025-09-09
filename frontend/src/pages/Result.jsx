import React from 'react'
import { assets } from '../assets/assets'

const Result = () => {
  return (
    <form className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
      <div className='relative'>
        <img src={assets.sample_img_1} alt="" className='max-w-sm rounded' />
        <span className='absolute h-1 w-full transition-all duration-[10s] bottom-0 left-0 bg-blue-500'/>
      </div>
      <p>Loading...</p>
    </div>

    <div className='flex w-full max-w-xl text-white bg-neutral-500 text-sm p-0.5 mt-10 rounded-full'>
      <input type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'/>
      <button className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
    </div>
    <div className='flex gap-2 flex-wrap justify-center text-white text-sm mt-10 rounded-full p-0.5'>
      <p className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href="" download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>

    </form>
  )
}

export default Result
