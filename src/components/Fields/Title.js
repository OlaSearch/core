import React from 'react'
import { createHTMLMarkup } from './../../utilities'
import { log } from './../../actions/Logger'

class Title extends React.Component {
  logClick = (event) => {
    let { onClick, result, isBookmark, isAutosuggest } = this.props

    if (onClick) onClick(event)

    /* Send Log */
    let eventLabel = isBookmark ? 'Bookmarks' : isAutosuggest ? 'autosuggest' : null
    this.context.store.dispatch(log({
      eventType: 'C',
      result,
      eventCategory: 'Title',
      eventAction: 'click',
      eventLabel
    }))
  };

  render () {
    var { result, isLink, children, baseUrl, url, iconLeft, iconRight } = this.props
    var { title, highlighting } = result

    if (!url) url = result.url
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
  isBookmark: false
}

Title.contextTypes = {
  store: React.PropTypes.object
}

module.exports = Title
