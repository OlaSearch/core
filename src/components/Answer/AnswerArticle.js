import React from 'react'
import PropTypes from 'prop-types'
import Header from './common/Header'
import Divider from './common/Divider'
import Button from './common/Button'
import Person from '../Fields/Person'
import Title from '../Fields/Title'

/**
 * Create an answer article
 */
function AnswerArticle ({ card, onSelect }) {
  const {
    url,
    image,
    title,
    author,
    date_published,
    subtitle,
    content,
    related,
    buttons
  } = card

  const relatedList =
    related && related.length
      ? related.map((entry, i) => <Title key={i} result={entry} />)
      : null

  return (
    <div className='ola-answer-article'>
      <div className='ola-answer-article-aside'>
        <div className='ola-answer-card-wrapper ola-answer-article-info'>
          {image && <img src={image} className='ola-answer-article-image' />}
          <div className='ola-answer-article-contribution'>
            <Person people={author} displayIcon />
            {date_published && (
              <div className='ola-answer-article-date'>{date_published}</div>
            )}
            {buttons && buttons.length ? (
              <div className='ola-answer-buttons'>
                {buttons.map((button, idx) => (
                  <Button {...button} onClick={onSelect} key={idx} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {related && related.length ? (
          <div className='ola-answer-card-wrapper ola-answer-article-related'>
            <div>Related Articles</div>
            <Divider horizontal />
            <div className='ola-answer-article-related-articles'>
              {relatedList}
            </div>
          </div>
        ) : null}
      </div>
      <div className='ola-answer-card-wrapper ola-answer-article-main'>
        <div className='ola-answer-article-header'>
          <Header title={title} url={url} subtitle={subtitle} />
        </div>
        <Divider horizontal />
        <div className='ola-answer-article-body'>
          <div className='ola-answer-article-content'>{content}</div>
        </div>
      </div>
    </div>
  )
}

AnswerArticle.propTypes = {
  /**
   * answer card object
   */
  card: PropTypes.object,
  /**
   * Callback when a card is clicked
   */
  onSelect: PropTypes.func
}

AnswerArticle.defaultProps = {
  card: {}
}

export default AnswerArticle
