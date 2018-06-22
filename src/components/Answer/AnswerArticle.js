import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Header from './common/Header'
import Divider from './common/Divider'
import Button from './common/Button'

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
    related_articles,
    buttons
  } = card

  /**
   * Render the author element
   * @param {Object} entry
   */
  const renderAuthor = (entry) => {
    if (!entry) return null

    const { name, url } = entry

    let component = 'p'
    let props = {
      className: 'ola-answer-article-author'
    }

    if (url) {
      component = 'a'
      props.href = url
    }

    return React.createElement(component, props, name)
  }

  /**
   * Render related article element
   * @param {Object} entry
   */
  const renderRelatedArticle = (entry) => {
    if (!entry) return null

    const { title, url } = entry

    return React.createElement(
      'a',
      {
        className: 'ola-answer-article-related-article',
        href: url
      },
      title
    )
  }

  let authors = author.length ? author.map((entry) => renderAuthor(entry)) : null

  let relatedArticles = related_articles.length
    ? related_articles.map((entry) => renderRelatedArticle(entry))
    : null

  return (
    <div className='ola-answer-article'>
      <div className='ola-answer-article-aside'>
        <div className='ola-answer-card-wrapper ola-answer-article-info'>
          {image && <img src={image} className='ola-answer-article-image' />}

          <p className='ola-answer-article-short-desc'>{subtitle}</p>
          <div className='ola-answer-article-contribution'>
            {author && (
              <div className='ola-answer-article-authors'>{authors}</div>
            )}
            {date_published && (
              <p className='ola-answer-article-date'>{date_published}</p>
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
        {related_articles && related_articles.length ? (
          <div className='ola-answer-card-wrapper ola-answer-article-related'>
            <p>'Related Articles' </p>
            <Divider horizontal />
            <div className='ola-answer-article-related-articles'>
              {relatedArticles}
            </div>
          </div>
        ) : null}
      </div>
      <div className='ola-answer-card-wrapper ola-answer-article-main'>
        <div className='ola-answer-article-header'>
          <Header title={title} url={url} />
        </div>
        <Divider horizontal />
        <div className='ola-answer-article-body'>
          <p className='ola-answer-article-content'>{content}</p>
        </div>
      </div>
    </div>
  )
}

AnswerArticle.propTypes = {
  card: PropTypes.object
}

AnswerArticle.defaultProps = {
  card: {}
}

export default AnswerArticle
