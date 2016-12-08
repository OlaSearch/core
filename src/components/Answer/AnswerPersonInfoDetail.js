import React from 'react'
import ListKeyValue from './common/ListKeyValue'

const Answer = ({ data }) => {
  return (
    <div className='ola-answer-person-info-detail'>
      {data.map((item) => {
        let { title, subtitle, description, additional_data: additionalData } = item
        return (
          <div className='ola-answer-item'>
            <h3 className='ola-answer-title'>{title}</h3>
            <div className='ola-answer-subtitle'>{subtitle || description}</div>
            <ListKeyValue data={additionalData} />
          </div>
        )
      })}
    </div>
  )
}

module.exports = Answer
