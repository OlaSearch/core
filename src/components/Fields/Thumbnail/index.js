import React from 'react'
import PropTypes from 'prop-types'
import omit from 'ramda/src/omit'
import withLogger from './../../../decorators/withLogger'
import withConfig from './../../../decorators/withConfig'

/**
 * Display an image as a background or using an img tag
 */
function Thumbnail (props) {
  var {
    thumbnail,
    baseUrl,
    isLink,
    url,
    log,
    useBackgroundImage,
    logPayload,
    snippetId,
    result,
    config,
    ...rest
  } = props

  let restProps = omit(['size', 'collectionId', 'showIfEmpty'], rest)

  if (!thumbnail) return null

  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: 'Thumbnail',
      eventAction: 'click',
      snippetId,
      payload: logPayload
    })
  }

  let linkProps = isLink
    ? {
      href: url,
      onClick: handleClick,
      className: 'ola-img-link'
    }
    : {}

  let imageUrl = `${baseUrl}${thumbnail}`
  let imgThumbnail = useBackgroundImage ? (
    <div
      className='ola-img ola-img-bg'
      {...restProps}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  ) : (
    <img
      className='ola-img'
      {...restProps}
      src={`${baseUrl}${thumbnail}`}
      alt=''
    />
  )

  return (
    <div className='ola-field ola-field-img'>
      {isLink ? <a {...linkProps}>{imgThumbnail}</a> : imgThumbnail}
    </div>
  )
}

Thumbnail.propTypes = {
  /**
   * URL of the image
   */
  thumbnail: PropTypes.string,
  /**
   * Add a link to the image
   */
  isLink: PropTypes.bool,
  /**
   * URL of the link
   */
  url: PropTypes.string,
  /**
   * Use background image instead of `<img >` tag
   */
  useBackgroundImage: PropTypes.bool
}

Thumbnail.defaultProps = {
  baseUrl: '',
  isLink: false,
  url: null,
  useBackgroundImage: false
}

module.exports = withConfig(withLogger(Thumbnail))
