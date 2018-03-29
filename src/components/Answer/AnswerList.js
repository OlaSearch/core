import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import withToggle from './../../decorators/withToggle'
import Field from './common/Field'
import Button from './common/Button'
import Header from './common/Header'
import Source from './common/Source'
import AnswerCard from './AnswerCard'
import Swipeable from './../Swipeable'
import { connect } from 'react-redux'

/**
 * Displays a list of answer cards
 */
function AnswerList ({
  card,
  isCollapsed,
  toggle,
  max,
  translate,
  isDesktop,
  swipe,
  ...rest
}) {
  const { elements = [], source, title, subtitle, url, ...cardProps } = card
  const size = elements.length
  const isSwipe = swipe || !isDesktop
  return (
    <div className='ola-answer-list'>
      <div className='ola-answer-list-wrapper'>
        <Header title={title} subtitle={subtitle} url={url} />
        <div className='ola-answer-list-items'>
          {isSwipe ? (
            <Swipeable
              itemWidth={300}
              max={max}
              toggle={toggle}
              isCollapsed={isCollapsed}
            >
              {elements.map((item, idx) => (
                <AnswerCard card={item} key={idx} {...rest} />
              ))}
            </Swipeable>
          ) : (
            elements
              .slice(0, isCollapsed ? undefined : max)
              .map((item, idx) => (
                <AnswerCard card={item} key={idx} {...rest} />
              ))
          )}
        </div>
        {!isSwipe && size > max ? (
          <button className='ola-answer-link-more' onClick={toggle}>
            {isCollapsed
              ? translate('answers_show_less')
              : translate('answers_show_more')}
          </button>
        ) : null}
        <Source source={source} />
      </div>
    </div>
  )
}

AnswerList.defaultProps = {
  max: 3,
  swipe: false
}

function mapStateToProps (state) {
  return {
    isDesktop: state.Device.isDesktop
  }
}

module.exports = connect(mapStateToProps)(withTranslate(withToggle(AnswerList)))
