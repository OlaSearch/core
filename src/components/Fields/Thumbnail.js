import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-responsive'
import omit from 'ramda/src/omit'
import withLogger from './../../decorators/OlaLogger'

const Thumbnail = (props, context) => {
  var { mediaQuery, cdn } = context.config
  var {
    thumbnail,
    thumbnail_mobile: thumbnailMobile,
    baseUrl,
    isLink,
    url,
    log,
    useBackgroundImage,
    ...rest
  } = props

  let restProps = omit(['size', 'result', 'snippetId', 'collectionId', 'showIfEmpty'], rest)

  if (!thumbnail && !thumbnailMobile) return null

  let isSvg = thumbnail.split('.').pop().indexOf('svg') === 0
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
      className: 'ola-field ola-field-img ola-field-img-link'
    }
    : {}

  let imageUrl = `${baseUrl}${thumbnail}`
  let imgThumbnail = useBackgroundImage
    ? <div className='ola-img ola-img-bg' {...restProps} style={{ backgroundImage: `url(${imageUrl})` }} />
    : <img className='ola-img' {...restProps} src={`${baseUrl}${thumbnail}`} alt='' />

  if (!thumbnailMobile) {
    if (isLink) {
      return (
        <a {...linkProps}>
          {imgThumbnail}
        </a>
      )
    }
    return imgThumbnail
  }

  return (
    <div className='ola-field ola-field-img'>
      <Media query={mediaQuery.tablet}>
        {imgThumbnail}
      </Media>
      <Media query={mediaQuery.mobile}>
        <img className='ola-img ola-img-mobile' {...restProps} src={`${baseUrl}${thumbnailMobile}`} alt='' />
      </Media>
    </div>
  )
}

Thumbnail.contextTypes = {
  config: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

Thumbnail.propTypes = {
  thumbnail: PropTypes.string,
  thumbnail_mobile: PropTypes.string
}

Thumbnail.defaultProps = {
  baseUrl: '',
  isLink: false,
  url: null,
  useBackgroundImage: false
}

module.exports = withLogger(Thumbnail)
