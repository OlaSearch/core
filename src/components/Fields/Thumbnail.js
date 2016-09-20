import React from 'react'
import Media from 'react-responsive'

const Thumbnail = (props, context) => {
  var { mediaQuery } = context.config
  var {
    thumbnail,
    thumbnail_mobile: thumbnailMobile,
    result,
    ...rest
  } = props

  if (!thumbnail && !thumbnailMobile) return null

  if (!thumbnailMobile) {
    return (
      <img className='ola-img' {...rest} src={thumbnail} alt='' />
    )
  }

  return (
    <div>
      <Media query={mediaQuery.tablet}>
        <img className='ola-img ola-img-desktop' {...rest} src={thumbnail} alt='' />
      </Media>
      <Media query={mediaQuery.mobile}>
        <img className='ola-img ola-img-mobile' {...rest} src={thumbnailMobile} alt='' />
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

module.exports = Thumbnail
