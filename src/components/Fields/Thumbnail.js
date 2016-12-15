import React from 'react'
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
    ...rest
  } = props

  let restProps = omit(['size', 'result', 'snippetId', 'collectionId'], rest)

  if (!thumbnail && !thumbnailMobile) return null

  let isSvg = thumbnail.split('.').pop().indexOf('svg') === 0
  /**
   * If cdn exists
   */

  if (cdn && !baseUrl && !isSvg) {
    baseUrl = `${cdn}/`
    thumbnail = encodeURIComponent(thumbnail)
  }

  let linkProps = isLink
    ? {
      href: url,
      onClick: (event) => {
        log({
          eventType: 'C',
          result: props.result,
          eventCategory: 'Thumbnail',
          eventAction: 'click',
          snippetId: props.snippetId
        })
      },
      className: 'ola-image-linked'
    }
    : {}

  if (!thumbnailMobile) {
    if (isLink) {
      return (
        <a {...linkProps}>
          <img onError={(event) => {
            event.target.style = 'display:none;'
          }} className='ola-img' {...restProps} src={`${baseUrl}${thumbnail}`} alt='' />
        </a>
      )
    }
    return (
      <img onError={(event) => {
        event.target.style = 'display:none;'
      }} className='ola-img' {...restProps} src={`${baseUrl}${thumbnail}`} alt='' />
    )
  }

  return (
    <div>
      <Media query={mediaQuery.tablet}>
        <img className='ola-img ola-img-desktop' {...restProps} src={`${baseUrl}${thumbnail}`} alt='' />
      </Media>
      <Media query={mediaQuery.mobile}>
        <img className='ola-img ola-img-mobile' {...restProps} src={`${baseUrl}${thumbnailMobile}`} alt='' />
      </Media>
    </div>
  )
}

Thumbnail.contextTypes = {
  config: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func])
}

Thumbnail.propTypes = {
  thumbnail: React.PropTypes.string,
  thumbnail_mobile: React.PropTypes.string
}

Thumbnail.defaultProps = {
  baseUrl: '',
  isLink: false,
  url: null
}

module.exports = withLogger(Thumbnail)
