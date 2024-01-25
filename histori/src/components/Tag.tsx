import React from 'react'

interface TagProps {
    name: string
    }
const Tag = ({name}: TagProps) => {
  return (
    <div className='rounded-lg font-medium '>#{name}</div>
  )
}

export default Tag