import React from 'react'
import Header from './../Answer/common/Header'
import Chart from './Chart'

function Card (props) {
  const { title, subtitle, url } = props
  return (
    <div className='ola-viz-card'>
      <div className='ola-viz-card-wrapper'>
        <Header title={title} subtitle={subtitle} url={url} />
        <div className='ola-viz-card-body'>
          <Chart {...props} />
        </div>
      </div>
    </div>
  )
}

export default Card
