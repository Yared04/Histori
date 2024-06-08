import React from 'react'

interface TagProps {
    name: string
    color?: string
    }
const Tag = ({name, color}: TagProps) => {
  return (
    <div className={`rounded-full text-xs py-0.5 px-2 max-h-6 font-medium opacity-1 bg-white text-black`}>#{name}</div>
  )
}

export default Tag