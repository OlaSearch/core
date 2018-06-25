import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import ChevronDown from '@olasearch/icons/lib/chevron-down'

function SelectBox ({
  label,
  inline,
  children,
  onChange,
  value,
  suffix,
  className
}) {
  const classes = cx(
    'ola-select',
    {
      'ola-select-inline': inline
    },
    className
  )
  return (
    <div className={classes}>
      {label && <label className='ola-select-label'>{label}</label>}
      <div className='ola-select-wrap'>
        <select
          className='ola-select-element'
          value={value}
          onChange={onChange}
        >
          {children}
        </select>
        <ChevronDown size={20} />
      </div>
      {suffix && <span className='ola-select-suffix'>{suffix}</span>}
    </div>
  )
}

SelectBox.propTypes = {
  inline: PropTypes.bool
}

export default SelectBox
