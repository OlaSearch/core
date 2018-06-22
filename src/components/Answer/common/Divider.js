import React from 'react'
import cx from 'classnames'

export default function Divider ({ horizontal }) {
  const baseClass = 'ola-divider'
  let classes = cx(
    baseClass,
    horizontal ? `${baseClass}--horizontal` : `${baseClass}--vertical`
  )

  return <div className={classes} />
}
