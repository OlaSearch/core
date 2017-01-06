import React from 'react'
import classNames from 'classnames'
import { isSvg } from './../../utilities'

class AnswerCard extends React.Component {
  handleSelect = () => {
    if (this.props.result.hasOwnProperty('additional_data')) return this.props.onSelect(this.props.result)
  };
  render () {
    let { result, cdn, imagePlaceholder, isActive, module } = this.props
    let { image, description, subtitle, title, exists } = result
    let isClickable = !!result.additional_data
    if (module === 'spices.facts.place.capital') {
      image = image.length > 1 ? image[1] : image
    }
    let klass = classNames('ola-answer-item', {
      'ola-answer-item-active': isActive,
      'ola-answer-item-isSelectable': isClickable,
      'ola-answer-item-deActive': !exists
    })
    image = image || imagePlaceholder
    let bgImage = image ? isSvg(image) ? image : `${cdn ? cdn + '/' : ''}${image}` : null
    return (
      <div className={klass} onClick={this.handleSelect}>
        {image
          ? <div className='ola-answer-image' style={{
            backgroundImage: `url("${bgImage}")`
          }} />
          : null
        }
        <div className='ola-answer-content'>
          <h3 className='ola-answer-title'>
            {title}
          </h3>
          <div className='ola-answer-subtitle'>{subtitle || description}</div>
        </div>
      </div>
    )
  }
}

module.exports = AnswerCard
