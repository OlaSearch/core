import React from 'react'
import classNames from 'classnames'
import { isSvg } from './../../utilities'

const AnswerCard = ({ result, onSelect, cdn, imagePlaceholder, isActive, module }) => {
  function handleSelect () {
    if (result.hasOwnProperty('additional_data')) return onSelect(result)
  }

  let { image, subtitle, title, exists } = result
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
    <div className={klass} onClick={handleSelect}>
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
        <div className='ola-answer-subtitle'>{subtitle}</div>
      </div>
    </div>
  )
}

module.exports = AnswerCard
