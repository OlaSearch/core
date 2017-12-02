import React from 'react'
import PropTypes from 'prop-types'
import omit from 'rambda/lib/omit'
import withLogger from './../../decorators/OlaLogger'

function Thumbnail (props, context) {
  var { mediaQuery, cdn } = context.config
  var {
    thumbnail,
    baseUrl,
    isLink,
    url,
    log,
    useBackgroundImage,
    ...rest
  } = props

  let restProps = omit(
    ['size', 'result', 'snippetId', 'collectionId', 'showIfEmpty'],
    rest
  )

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
      result: props.result,
      eventCategory: 'Thumbnail',
      eventAction: 'click',
      snippetId: props.snippetId
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

Thumbnail.contextTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
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

module.exports = withLogger(Thumbnail)
