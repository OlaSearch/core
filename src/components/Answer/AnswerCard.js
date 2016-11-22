import React from 'react'
import classNames from 'classnames'
import { isSvg } from './../../utilities'

class AnswerCard extends React.Component {
  handleSelect = () => {
    this.props.onSelect(this.props.result)
  };
  render () {
    let { result, cdn, isActive, module } = this.props
    let isClickable = !!result.additional_data
    let { image, description, subtitle, title, exists } = result
    if (module === 'spices.facts.place.capital') {
      image = image.length > 1 ? image[1] : image
    }
    let klass = classNames('ola-answer-item', {
      'ola-answer-item-active': isActive,
      'ola-answer-item-isSelectable': isClickable,
      'ola-answer-item-deActive': !exists
    })
    image = image || 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png'
    let bgImage = isSvg(image) ? image : `${cdn}/${image}`
    return (
      <a className={klass} onClick={isClickable ? this.handleSelect : null}>
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
      </a>
    )
  }
}

module.exports = AnswerCard
