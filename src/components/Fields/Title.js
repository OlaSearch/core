import React from 'react'
import { createHTMLMarkup } from './../../utilities'
import { log } from './../../actions/Logger'

class Title extends React.Component {
  static defaultProps = {
    isLink: true
  };

  static contextTypes = {
    store: React.PropTypes.object
  };

  logClick = (event) => {
    let { onClick } = this.props

    if (onClick) onClick(event)

    this.context.store.dispatch(log('C', this.props.result))
  };

  render () {
    var { result, isLink, children, baseUrl, url } = this.props

    var {
      title,
      highlighting
    } = result

    if (!url) url = result.url

    if (baseUrl) url = baseUrl + url

    /* Check for highlighting */

    if (highlighting) {
      var { title: highlightedTitle } = highlighting
      if (typeof highlightedTitle === 'object') title = highlightedTitle[0]
    }

    return (
      <h3 className='ola-field ola-field-title'>
        {isLink
          ? <a href={url} onClick={this.logClick} dangerouslySetInnerHTML={createHTMLMarkup(title)} />
          : <span dangerouslySetInnerHTML={createHTMLMarkup(title)} />
        }
        {children}
      </h3>
    )
  }
}

module.exports = Title
