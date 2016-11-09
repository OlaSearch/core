import React from 'react'
import Media from 'react-responsive'

const Thumbnail = (props, context) => {
  var { mediaQuery, cdn } = context.config
  var {
    thumbnail,
    thumbnail_mobile: thumbnailMobile,
    baseUrl,
    size,
    result,
    ...rest
  } = props

  if (!thumbnail && !thumbnailMobile) return null

  let isSvg = thumbnail.split('.').pop().indexOf('svg') === 0
  /**
   * If cdn exists
   */

  if (cdn && !baseUrl && !isSvg) {
    baseUrl = `${cdn}/`
    thumbnail = encodeURIComponent(thumbnail)
  }

  if (!thumbnailMobile) {
    return (
      <img className='ola-img' {...rest} src={`${baseUrl}${thumbnail}`} alt='' />
    )
  }

  return (
    <div>
      <Media query={mediaQuery.tablet}>
        <img className='ola-img ola-img-desktop' {...rest} src={`${baseUrl}${thumbnail}`} alt='' />
      </Media>
      <Media query={mediaQuery.mobile}>
        <img className='ola-img ola-img-mobile' {...rest} src={`${baseUrl}${thumbnailMobile}`} alt='' />
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
  baseUrl: ''
}

module.exports = Thumbnail
