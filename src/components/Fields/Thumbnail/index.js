import React from 'react'
import PropTypes from 'prop-types'
import omit from 'ramda/src/omit'
import withLogger from './../../../decorators/withLogger'
import withConfig from './../../../decorators/withConfig'
import { BREAKPOINT_TABLET } from './../../../constants/Settings'

/**
 * Display an image as a background or using an img tag
 */
function Thumbnail (props) {
  var {
    thumbnail,
    baseUrl,
    isLink,
    caption,
    url,
    log,
    useBackgroundImage,
    logPayload,
    snippetId,
    result,
    config,
    width,
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
      {caption ? <div className='ola-field-img-caption'>{caption}</div> : null}
      <style jsx>
        {`
          @media only screen and (min-width: ${BREAKPOINT_TABLET}) {
            .ola-field-img {
              max-width: ${width}px;
            }
          }
        `}
      </style>
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
  useBackgroundImage: PropTypes.bool,
  /**
   * Width
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Thumbnail.defaultProps = {
  baseUrl: '',
  isLink: false,
  url: null,
  useBackgroundImage: false,
  width: 200
}

module.exports = withConfig(withLogger(Thumbnail))
