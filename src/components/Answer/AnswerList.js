import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import withToggle from './../../decorators/withToggle'
import Field from './common/Field'
import Button from './common/Button'
import AnswerCard from './AnswerCard'

/**
 * Displays a list of answer cards
 * @example ./src/components/Answer/AnswerList.md
 */
function AnswerList ({ card, isCollapsed, toggleDisplay, max, translate }) {
  const { elements = [], source } = card
  const size = elements.length
  return (
    <div className='ola-answer-list'>
      <div className='ola-answer-list-items'>
        {elements.slice(0, isCollapsed ? undefined : max).map((card, idx) => {
          return <AnswerCard card={card} key={idx} />
        })}
      </div>
      {source ? (
        <div className='ola-answer-source'>
          <span className='ola-answer-source-label'>Source: </span>
          <a href={source.url} className='ola-answer-source-link'>
            {source.name}
          </a>
        </div>
      ) : null}
      {size > max ? (
        <button className='ola-answer-link-more' onClick={toggleDisplay}>
          {isCollapsed
            ? translate('answers_show_less')
            : translate('answers_show_more')}
        </button>
      ) : null}
    </div>
  )
}

AnswerList.defaultProps = {
  max: 3
}

module.exports = withTranslate(withToggle(AnswerList))
