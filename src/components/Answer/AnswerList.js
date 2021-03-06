import React from 'react'
import cx from 'classnames'
import withTranslate from './../../decorators/withTranslate'
import withToggle from './../../decorators/withToggle'
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
  translate,
  isDesktop,
  swipe,
  itemWidth: defaultItemWidth,
  ...rest
}) {
  const {
    elements = [],
    source,
    title,
    subtitle,
    url,
    classname,
    max,
    swipe: listIsSwipe
  } = card
  const size = elements.length
  const isSwipe = swipe || listIsSwipe || !isDesktop
  const classes = cx('ola-answer-list', classname, {
    'ola-answer-list-swipe': isSwipe
  })
  const itemWidth = card.width || defaultItemWidth
  return (
    <div className={classes}>
      <div className='ola-answer-list-wrapper'>
        <Header title={title} subtitle={subtitle} url={url} />
        <div className='ola-answer-list-items'>
          {isSwipe ? (
            <Swipeable
              itemWidth={itemWidth}
              max={max}
              size={size}
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
  swipe: false,
  itemWidth: 260
}

function mapStateToProps (state) {
  return {
    isDesktop: state.Device.isDesktop
  }
}

export default connect(mapStateToProps)(withTranslate(withToggle(AnswerList)))
