import React from 'react'
import PropTypes from 'prop-types'
import Header from './common/Header'
import Button from './common/Button'
import ButtonField from './../Fields/Button'
import TextField from './../Fields/TextField'
import Person from './../Fields/Person'
import DateField from './../Fields/Date'
import { DEFAULT_DISPLAY_DATE_FORMAT } from './../../constants/Settings'
import withTranslate from './../../decorators/withTranslate'
import withTheme from './../../decorators/withTheme'

/**
 * Create an answer article
 */
function AnswerArticle ({ card, onSelect, translate, theme }) {
  const {
    url,
    image,
    title,
    author,
    date_published: datePublished,
    subtitle,
    related = [],
    buttons = []
  } = card

  return (
    <div className='ola-answer-article'>
      <div className='ola-answer-card-wrapper'>
        <div className='ola-flex-md'>
          <div className='ola-flex-aside'>
            {image ? (
              <img src={image} className='ola-answer-article-image' />
            ) : null}
            <Person people={author} displayIcon />
            <DateField
              date={datePublished}
              format={DEFAULT_DISPLAY_DATE_FORMAT}
              displayIcon
              fieldLabel={translate('published_on')}
            />
            {buttons.length ? (
              <div className='ola-answer-buttons'>
                {buttons.map((button, idx) => {
                  return <Button {...button} onClick={onSelect} key={idx} />
                })}
              </div>
            ) : null}
          </div>
          <div className='ola-flex-content'>
            <Header
              title={title}
              url={url}
              openInNewWindow
              subtitle={subtitle}
            />
            <TextField field='content' result={card} length={null} />
            <LinkList links={related} title={translate('related_articles')} />
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .ola-answer-article :global(.ola-field-title) {
            font-size: ${theme.largeFontSize};
          }
        `}
      </style>
    </div>
  )
}

/**
 * Link list
 * @param {Array} options.links
 */
function LinkList ({ links, title }) {
  if (!links.length) return null
  return (
    <div className='ola-linklist'>
      <div className='ola-linklist-title'>{title}</div>
      <div className='ola-linklist-body'>
        {links.map(({ title, url }, idx) => {
          return <ButtonField textLink key={idx} label={title} url={url} />
        })}
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

export default withTheme(withTranslate(AnswerArticle))
