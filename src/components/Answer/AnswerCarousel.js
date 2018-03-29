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
function AnswerCarousel ({ card, onSelect, itemWidth }) {
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
          <Swipeable itemWidth={itemWidth}>
            {images.map(({ src, url, title }, idx) => {
              return (
                <div className='ola-answer-carousel-item' key={idx}>
                  <div className='ola-answer-carousel-item-wrapper'>
                    {React.createElement(
                      url ? 'a' : 'div',
                      { href: url },
                      <img src={src} alt={title} />
                    )}
                    {title ? (
                      <div className='ola-answer-carousel-title'>{title}</div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </Swipeable>

          {buttons.length ? (
            <div className='ola-answer-buttons'>
              {buttons.map((button, idx) => {
                return <Button {...button} onClick={onSelect} key={idx} />
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
  onSelect: PropTypes.func,
  /**
   * Item width
   */
  itemWidth: PropTypes.number
}

AnswerCarousel.defaultProps = {
  itemWidth: 300
}

export default AnswerCarousel
