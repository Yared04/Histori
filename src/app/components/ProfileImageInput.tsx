"use client"
import Image from 'next/image'
import React, { useState, ChangeEvent } from 'react'
import ProfileEditIcon from '../../../public/profile-edit.svg'

const ProfileImageInput = () => {
    const [image, setImage] = useState<File | null>(null)
  const handleClick = (event: ChangeEvent<HTMLInputElement>) =>{
    const files = event.target.files
    if ( files && files.length != 0){
      setImage(files[0])
    }

  }
  return (
    
      <div className='w-fit mx-auto'>
          <input onChange={handleClick} type='file'  id='imageUpload' className="hidden" />
        {
          image ?
          <div className='relative w-[3rem] h-[3rem] rounded-full'> 
            <Image className="object-cover  " fill src={URL.createObjectURL(image)} alt='Profile Image' /> 
          </div>
          :
          <div className='relative w-[3rem] bg-[#0074AB] h-[3rem] rounded-full flex justify-center items-center'> 
          <p className='font-medium text-xl text-white'>N</p>
          <div className='w-[1rem] absolute bottom-0 right-0 h-[1rem]  '>
            <Image className="object-cover right-0 bottom-0" fill src={ProfileEditIcon} alt='Profile Image' /> 
            </div>
          </div>
        }
        {/* {
            image && 
            <label htmlFor='imageUpload' className='bg-white cursor-pointer border opacity-40 px-10 py-2  font-medium absolute top-10 right-10'>
                Edit
            </label>
        } */}
      </div>
    
  )
}

export default ProfileImageInput