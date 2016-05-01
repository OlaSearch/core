import React from 'react'

const Rating = ({ rating, interval }) => {
  let normalized = rating / interval
  let star = []
  let total = Math.max(Math.ceil(normalized), 1)
  let maxInterval = 100/interval

  for (let i = 0; i < total; i++) {
    star.push(
      <em key={i} className='ion ion-ios-star ola-rating-active' />
    )
  }

  for (let i = total; i < maxInterval; i++) {
    star.push(
      <em key={i} className='ion ion-ios-star ola-rating-inactive' />
    )
  }

  if (!star.length) star = <em className='ion ion-ios-star' />

  return (
    <div className='ola-snippet-rating'>
      {star}
    </div>
  )
}

Rating.defaultProps = {
  interval: 20
}

module.exports = Rating
