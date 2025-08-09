import React from 'react'
import { assets } from '../assets/assets.js'

const Header = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center my-20'>
      <div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </div>
      <h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'>image</span> , in seconds.</h1>
      <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with our AI-powered tool. Turn your imagination into stunning visuals effortlessly.</p>

      <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 rounded-full items-center gap-2'>Generate Images</button>

      <div>
        {Array(6).fill('').map((_, index) => (
          <img key={index} src={assets.image_placeholder} alt={`Placeholder ${index + 1}`} className='w-32 h-32 object-cover rounded-md m-2' />
        ))}
      </div>
    </div>
  )
}

export default Header
