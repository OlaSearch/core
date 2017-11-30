import React from 'react'
import FieldLabel from './FieldLabel'

function Rating ({ rating, interval, activeClass, inActiveClass, emptyClass, fieldLabel }) {
  let normalized = rating / interval
  let star = []
  let total = Math.max(Math.ceil(normalized), 1)
  let maxInterval = 100 / interval

  for (let i = 0; i < total; i++) {
    star.push(<em key={i} className={activeClass} />)
  }

  for (let i = total; i < maxInterval; i++) {
    star.push(<em key={i} className={inActiveClass} />)
  }

  if (!star.length) star = <em className={emptyClass} />

  return (
    <div className='ola-field ola-field-rating'>
      <FieldLabel label={fieldLabel} />
      <div className='ola-field-rating-stars'>
        {star}
      </div>
    </div>
  )
}

Rating.defaultProps = {
  interval: 20,
  activeClass: 'ion ion-ios-star ola-rating-active',
  inActiveClass: 'ion ion-ios-star ola-rating-inactive',
  emptyClass: 'ion ion-ios-star'
}

module.exports = Rating
