import React from 'react'

export default function Button (props) {
  const { title, onClick } = props
  function handleClick () {
    onClick && onClick(props)
  }
  return (
    <button className='ola-answer-button' type='button' onClick={handleClick}>
      {title}
    </button>
  )
}
