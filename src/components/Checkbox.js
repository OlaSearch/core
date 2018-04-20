import React from 'react'
import cx from 'classnames'
import Check from '@olasearch/icons/lib/check'

export default function Checkox ({
  label,
  parentClassName,
  disabled,
  checked,
  ...props
}) {
  const classes = cx('ola-faux-checkbox', 'ola-flex', parentClassName, {
    'ola-faux-checkbox-checked': checked,
    'ola-faux-checkbox-disabled': disabled
  })
  return (
    <label className={classes}>
      <div className='ola-flex-icon ola-checkbox-icon' />
      <input
        type='checkbox'
        className='ola-checkbox-element'
        checked={checked}
        disabled={disabled}
        {...props}
      />
      <div className='ola-flex-content ola-checkbox-label'>{label}</div>
    </label>
  )
}
