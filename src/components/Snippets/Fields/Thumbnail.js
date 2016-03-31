import React from 'react'
import Media from 'react-responsive'

const Thumbnail = (props, context) => {
  var { mediaQuery } = context.config

  var {
    thumbnail,
    thumbnail_mobile,
    ...rest
  } = props

  if (!thumbnail_mobile) {
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
        <img className='ola-img ola-img-mobile' {...rest} src={thumbnail_mobile} alt='' />
      </Media>
    </div>
  )
}

Thumbnail.contextTypes = {
  config: React.PropTypes.object
}

Thumbnail.propTypes = {
  thumbnail: React.PropTypes.string,
  thumbnail_mobile: React.PropTypes.string
}

module.exports = Thumbnail
