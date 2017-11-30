import React from 'react'

export default function InputShadow ({ value }) {
  return (
    <input
      type='text'
      value={value}
      className='ola-text-input ola-text-input-round ola-text-inputshadow'
      autoComplete='off'
      autoCorrect='off'
      autoCapitalize='off'
      spellCheck='false'
      disabled
    />
  )
}
