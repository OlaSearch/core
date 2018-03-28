import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import Field from './common/Field'
import Header from './common/Header'
import Source from './common/Source'
import classNames from 'classnames'
import Swipeable from './../Swipeable'

/**
 * Create an answer card
 */
function AnswerCarousel ({ card, onSelect, placeholderImage }) {
  let {
    images = [],
    subtitle,
    title,
    url,
    buttons = [],
    source,
    fields = []
  } = card
  return (
    <div className='ola-answer-card ola-answer-carousel'>
      <div className='ola-answer-card-wrapper'>
        <div className='ola-answer-content'>
          <Header title={title} subtitle={subtitle} url={url} />
          <Swipeable itemWidth={300}>
            {images.map(({ url, title }, idx) => {
              return <img src={url} alt={title} key={idx} />
            })}
          </Swipeable>

          {buttons.length ? (
            <div className='ola-answer-buttons'>
              {buttons.map((button, idx) => {
                return <Button {...button} key={idx} />
              })}
            </div>
          ) : null}
        </div>
      </div>
      <Source source={source} />
    </div>
  )
}

AnswerCarousel.propTypes = {
  /**
   * answer card object
   */
  card: PropTypes.object,
  /**
   * Callback when a card is clicked
   */
  onSelect: PropTypes.func
}

export default AnswerCarousel
