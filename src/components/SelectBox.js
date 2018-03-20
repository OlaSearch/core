import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import ChevronDown from '@olasearch/icons/lib/chevron-down'

function SelectBox ({ label, inline, children, onChange, value }) {
  const classes = cx('ola-select', {
    'ola-select-inline': inline
  })
  return (
    <div className={classes}>
      <label className='ola-select-label'>{label}</label>
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
    </div>
  )
}

SelectBox.propTypes = {
  inline: PropTypes.bool
}

export default SelectBox
