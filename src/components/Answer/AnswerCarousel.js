import React from 'react'
import PropTypes from 'prop-types'
import Button from './common/Button'
import Field from './common/Field'
import Header from './common/Header'
import Source from './common/Source'
import classNames from 'classnames'
import Swipeable from './../Swipeable'
import Portal from './../Portal'
import cx from 'classnames'

/**
 * Create an answer card
 */
class AnswerCarousel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalImage: null
    }
  }
  displayImage = (src) => {
    this.setState({
      modalImage: src
    })
  }
  hideImage = () => {
    this.setState({
      modalImage: null
    })
  }
  render () {
    const { card, onSelect, itemWidth } = this.props
    let {
      images = [],
      width,
      height,
      subtitle,
      title,
      url,
      modal,
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
                          onClick: () => modal && this.displayImage(src)
                        },
                        <img
                          src={src}
                          alt={title}
                          width={width}
                          height={height}
                        />
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
            <Portal
              isOpen={this.state.modalImage}
              onRequestClose={this.hideImage}
              inline
            >
              <div className='ola-modal-content-image'>
                <img src={this.state.modalImage} />
              </div>
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
