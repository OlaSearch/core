import React from 'react'
import cx from 'classnames'

export default function Overlay ({ active, onDismiss }) {
  const classes = cx('ola-content-overlay', {
    'ola-content-overlay-active': active
  })
  return <div className={classes} onClick={onDismiss} />
}
