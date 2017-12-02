import React from 'react'
import ListKeyValue from './common/ListKeyValue'
import injectTranslate from './../../decorators/OlaTranslate'
import withToggle from './../../decorators/OlaToggle'

function AnswerPersonInfoDetail ({ isCollapsed, toggleDispay, data, max, translate }) {
  let { caption } = data
  let size = data.length
  return (
    <div className='ola-answer-person-info-detail'>
      {caption && <h4 className='ola-answer-table-caption'>{caption}</h4>}
      <div className='ola-answer-person-items'>
        {data.slice(0, isCollapsed ? undefined : max).map((item, idx) => {
          let {
            title,
            subtitle,
            description,
            additional_data: additionalData
          } = item
          return (
            <div className='ola-answer-item' key={idx}>
              <div className='ola-answer-title'>
                <span className='ola-answer-title-text'>{title}</span>
                <div className='ola-answer-subtitle'>
                  {subtitle || description}
                </div>
              </div>

              <ListKeyValue data={additionalData} />
            </div>
          )
        })}
      </div>
      {!isCollapsed && size > max ? (
        <button className='ola-answer-link-more' onClick={toggleDispay}>
          {isCollapsed
            ? translate('answers_show_less')
            : translate('answers_show_more')}
        </button>
      ) : null}
    </div>
  )
}

AnswerPersonInfoDetail.defaultProps = {
  max: 6
}

module.exports = injectTranslate(withToggle(AnswerPersonInfoDetail))
