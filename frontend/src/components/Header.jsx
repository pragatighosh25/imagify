import React from 'react'
import { assets } from '../assets/assets.js'
import {motion} from 'framer-motion'

const Header = () => {
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}}
    >
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
      initial={{opacity:0, y:-20}}
      animate={{opacity:1, y:0}}
      transition={{delay:0.2, duration:0.8}}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>
      <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.4, duration:2}}
      >Turn text to
        <span className='text-blue-600'> image</span>, in seconds.</motion.h1>
      <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with our AI-powered tool. Turn your imagination into stunning visuals effortlessly.</p>

      <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 rounded-full items-center gap-2 hover:opacity-80 transition-all duration-300'>Generate Images</button>

      <div className='flex flex-wrap justify-center mt-16 gap-3'>
        {Array(6).fill('').map((item, index) => (
          <img key={index} src={index%2===0 ? assets.sample_img_1 : assets.sample_img_2} alt='' width={70} className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'  />
        ))}
      </div>
      <p className='mt-2 text-neutral-600 '>Generated images from Imagify</p>
    </motion.div>
  )
}

export default Header
