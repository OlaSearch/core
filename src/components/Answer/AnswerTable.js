import React from 'react'
import PropTypes from 'prop-types'
import Header from './common/Header'
import TableDetail from './common/TableDetail'
import Source from './common/Source'

/**
 * Displays a table
 */
export default function AnswerTable ({ card }) {
  const { title, source } = card
  return (
    <div className='ola-answer-table'>
      <div className='ola-answer-card-wrapper'>
        <Header title={title} />
        <TableDetail card={card} />
      </div>
      <Source source={source} />
    </div>
  )
}
