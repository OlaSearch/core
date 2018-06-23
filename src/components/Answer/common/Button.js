import React from 'react'
import cx from 'classnames'

export default function Button (props) {
  const { title, image, onClick } = props
  function handleClick () {
    onClick && onClick(props)
  }
  const classes = cx('ola-answer-button', {
    'ola-answer-button-with-image': image
  })
  return (
    <button className={classes} type='button' onClick={handleClick}>
      {image ? (
        <img src={image} alt={title} className='ola-answer-button-image' />
      ) : (
        title
      )}
    </button>
  )
}

Button.defaultProps = {
  image: null
}
