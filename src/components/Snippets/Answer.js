import React from 'react'
import Thumbnail from './../Fields/Thumbnail'
import { createHTMLMarkup } from './../../utilities'

const Answer = ({ answer, isLoading, result }) => {
  if (isLoading) {
    return (
      <div className='ola-answer-loading'>
        <p>Fetching instant answer</p>
      </div>
    )
  }
  /**
   * If the answer is from search engine
   */
  if (result) {
    return (
      <div className='ola-snippet ola-answer'>
        <div dangerouslySetInnerHTML={createHTMLMarkup(result.ola_answer)} />
      </div>
    )
  }
  if (!answer) return null
  let { data, callback, template, enrich, source } = answer
  /**
   * If the answer is from Intent engine
   */
  if (data) {
    return (
      <div className='ola-snippet ola-answer'>
        {data.map(({ image, description, subtitle, title }, idx) => {
          return (
            <div className='ola-answer-item' key={idx}>
              <div className='ola-answer-image'>
                <Thumbnail
                  thumbnail={image}
                  width='120'
                />
              </div>
              <div className='ola-answer-content'>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>
                  <small>
                    {source.name} - {source.url}
                  </small>
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

module.exports = Answer
