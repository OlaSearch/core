import React from 'react'
import { createHTMLMarkup } from './../../utilities'
import withLogger from './../../decorators/OlaLogger'

class Title extends React.Component {
  logClick = (event) => {
    let { onClick, result, isBookmark, isAutosuggest } = this.props

    /* Send Log */
    let eventLabel = isBookmark ? 'Bookmarks' : isAutosuggest ? 'autosuggest' : null
    this.props.log({
      eventType: 'C',
      result,
      eventCategory: 'Title',
      eventAction: 'click',
      eventLabel,
      snippetId: this.props.snippetId
    })

    if (onClick) onClick(event)
  };

  render () {
    var { result, isLink, field, children, baseUrl, url, iconLeft, iconRight } = this.props
    var { highlighting } = result
    var title = result[field || 'title']

    if (!url) url = result.url || this.props.url
    if (baseUrl) url = baseUrl + url

    /* Check for highlighting */

    if (highlighting) {
      var { title: highlightedTitle } = highlighting
      if (typeof highlightedTitle === 'object') title = highlightedTitle[0]
    }

    return (
      <h3 className='ola-field ola-field-title'>
        {iconLeft}
        {isLink
          ? <a href={url} onClick={this.logClick} dangerouslySetInnerHTML={createHTMLMarkup(title)} />
          : <span dangerouslySetInnerHTML={createHTMLMarkup(title)} />
        }
        {children}
        {iconRight}
      </h3>
    )
  }
}

Title.defaultProps = {
  isLink: true,
  iconLeft: null,
  iconRight: null,
  isBookmark: false,
  field: null
}

module.exports = withLogger(Title)
