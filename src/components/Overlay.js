import React from 'react'
import cx from 'classnames'

export default function Overlay ({ active, isAbsolute, onDismiss }) {
  const classes = cx('ola-content-overlay', {
    'ola-content-overlay-active': active,
    'ola-content-overlay-absolute': isAbsolute
  })
  return <div className={classes} onClick={onDismiss} />
}
