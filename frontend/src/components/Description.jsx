import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'

const Description = () => {
  return (
    <motion.div
    initial={{opacity:0.2, y:100}}
    transition={{duration: 1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once: true}}
    
    
    className='flex flex-col items-center justify-center my-24 p-6 md:px-28'>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visuals</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg'/>
        <div>
          <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-powered Text to Image Generator</h2>
          <p className='text-gray-600 mb-4'>
            Unleash your creativity with our AI-powered Text to Image Generator. This innovative tool allows you to turn your ideas into stunning visuals in just a few clicks. Whether you're a designer, marketer, or simply looking to create eye-catching images, our generator is here to help. Experience the future of creativity with our advanced AI model that transforms text prompts into stunning images.
          </p>
          <p className='text-gray-600 mb-4'>
            Our user-friendly interface makes it easy for anyone to create stunning images, regardless of their design experience. Simply enter your text prompt, and let our AI do the rest. With a vast library of styles and customization options, you can create unique visuals that truly represent your ideas.
          </p>
        </div>
        
      </div>
    </motion.div>
  )
}

export default Description
