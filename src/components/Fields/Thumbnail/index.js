import React from 'react'
import PropTypes from 'prop-types'
import omit from 'ramda/src/omit'
import withLogger from './../../../decorators/withLogger'
import withConfig from './../../../decorators/withConfig'

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

  var { mediaQuery, cdn } = config

  let restProps = omit(['size', 'collectionId', 'showIfEmpty'], rest)

  if (!thumbnail) return null

  let isSvg =
    thumbnail
      .split('.')
      .pop()
      .indexOf('svg') === 0
  /**
   * If cdn exists
   */

  if (cdn && !baseUrl && !isSvg) {
    baseUrl = `${cdn}/`
    thumbnail = encodeURIComponent(thumbnail)
  }

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
  thumbnail: PropTypes.string
}

Thumbnail.defaultProps = {
  baseUrl: '',
  isLink: false,
  url: null,
  useBackgroundImage: false
}

module.exports = withConfig(withLogger(Thumbnail))
