import React from 'react'
import { NO_SCRIPT_TAG } from './../../constants/Settings'

const Tooltip = (props) => {
  if (!props.isShown) return NO_SCRIPT_TAG

  let { onClose, content } = props

  return (
    <div className='ola-tooltip-holder'>
      <div className='ola-tooltip-content'>
        <p>{content}</p>
        <a onClick={onClose}>Close</a>
      </div>
      <div className='ola-modal-background' onClick={onClose}></div>
    </div>
  )
}

Tooltip.defaultProps = {
  content: 'Here are your selections. You can always add or remove filters.'
}

module.exports = Tooltip
