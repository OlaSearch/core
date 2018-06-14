import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import withLogger from './../../../decorators/withLogger'

/**
 * Displays an URL field
 */
function Url ({
  result,
  field,
  onClick,
  log,
  snippetId,
  anchorLink,
  label,
  className,
  logPayload
}) {
  let { url } = result
  if (field) {
    url = result[field]
  }
  if (!url) return null
  if (anchorLink) url = `${url}#${anchorLink}`
  if (!label) label = url
  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: 'Title',
      eventAction: 'click',
      snippetId,
      payload: logPayload
    })
    onClick && onClick(event)
  }
  const classes = cx('ola-field', 'ola-field-url', className)

  return (
    <a className={classes} href={url} title={url} onClick={handleClick}>
      {label}
    </a>
  )
}

Url.defaultProps = {
  field: 'url'
}

Url.propTypes = {
  /**
   * Field to use as url
   */
  field: PropTypes.string,
  /**
   * Search result
   */
  result: PropTypes.object.isRequired,
  /**
   * Anchor link of the url
   */
  anchorLink: PropTypes.string,
  /**
   * Label of the url
   */
  label: PropTypes.string
}

export default withLogger(Url)
