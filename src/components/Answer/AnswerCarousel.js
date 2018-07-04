import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import Header from './common/Header'
import Source from './common/Source'
import Swipeable from './../Swipeable'
import Portal from './../Portal'
import cx from 'classnames'
import Thumbnail from './../Fields/Thumbnail'
import { BUTTON_TYPE } from './../../constants/Settings'

/**
 * Create an answer card
 */
class AnswerCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: null
    }
  }
  displayImage = (index) => {
    this.setState({
      index
    })
  }
  hideImage = () => {
    this.setState({
      index: null
    })
  }
  handleCardSelect = (event) => {
    const label = event.target.textContent
    if (!label) return
    this.props.onSelect({
      label,
      type: BUTTON_TYPE.POSTBACK
    })
  }
  render () {
    const { card, onSelect, itemWidth } = this.props
    const {
      images = [],
      width,
      height,
      subtitle,
      title,
      url,
      modal,
      buttons = [],
      source,
      classname
    } = card
    const classes = cx('ola-answer-card', 'ola-answer-carousel', classname)
    return (
      <div className={classes}>
        <div className='ola-answer-card-wrapper'>
          <div className='ola-answer-content'>
            <Header title={title} subtitle={subtitle} url={url} />
            <Swipeable itemWidth={itemWidth} document={this.props.document}>
              {images.map(({ src, title }, idx) => {
                const classes = cx('ola-answer-carousel-image', {
                  'ola-answer-selectable': modal
                })
                return (
                  <div className='ola-answer-carousel-item' key={idx}>
                    <div className='ola-answer-carousel-item-wrapper'>
                      {React.createElement(
                        modal ? 'a' : 'div',
                        {
                          className: classes,
                          onClick: () => modal && this.displayImage(idx)
                        },
                        <img
                          src={src}
                          alt={title}
                          width={width}
                          height={height}
                        />
                      )}
                      <Header title={title} onClick={this.handleCardSelect} />
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
            <Portal
              isOpen={this.state.index !== null}
              onRequestClose={this.hideImage}
              focusContent={false} /* Swipeable already focuses */
            >
              <Swipeable
                itemWidth='100vw'
                startIndex={this.state.index}
                autoFocus
                className='ola-swipeable-carousel'
              >
                {images.map(({ src }, idx) => {
                  return (
                    <Thumbnail
                      key={idx}
                      thumbnail={src}
                      width='auto'
                      showLoading
                    />
                  )
                })}
              </Swipeable>
            </Portal>
          </div>
        </div>
        <Source source={source} />
      </div>
    )
  }
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
  itemWidth: 'auto'
}

export default AnswerCarousel
