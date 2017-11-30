import React from 'react'
import { formatText } from './../../../utilities'

export default function ListKeyValue ({ data }) {
  if (!data) return null
  return (
    <div className='ola-answer-keyvalue'>
      {data.map(({ label, value }, idx) => {
        return (
          <div className='ola-answer-row' key={idx}>
            <div className='ola-answer-label'>{label}</div>
            <div className='ola-answer-value'>{formatText(value, label)}</div>
          </div>
        )
      })}
    </div>
  )
}
