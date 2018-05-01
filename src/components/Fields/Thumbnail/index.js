import React from 'react'
import PropTypes from 'prop-types'
import omit from 'ramda/src/omit'
import cx from 'classnames'
import withLogger from './../../../decorators/withLogger'
import withConfig from './../../../decorators/withConfig'
import { BREAKPOINT_TABLET } from './../../../constants/Settings'

/**
 * Display an image as a background or using an img tag
 */
class Thumbnail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
      loaded: false
    }
  }
  static defaultProps = {
    showLoading: false
  }
  handleClick = (event) => {
    const { log, result, snippetId, logPayload, onClick } = this.props
    log({
      eventType: 'C',
      result,
      eventCategory: 'Thumbnail',
      eventAction: 'click',
      snippetId,
      payload: logPayload
    })
    if (onClick) {
      onClick(event)
      event.preventDefault()
    }
  }
  handleError = (event) => {
    console.warn('Received 404 while showing this image', this.props.thumbnail)
    this.setState({
      error: true
    })
  }
  handleLoad = () => {
    if (!this.props.showLoading) return
    this.setState({
      loaded: true
    })
  }
  render () {
    if (this.state.error) return null

    let {
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
      placeholder,
      showLoading,
      ...rest
    } = this.props

    const restProps = omit(
      ['size', 'collectionId', 'showIfEmpty', 'alwaysUpdate'],
      rest
    )

    if (!thumbnail && placeholder) thumbnail = placeholder

    if (!thumbnail) return null

    const linkProps = isLink
      ? {
        href: url,
        onClick: this.handleClick,
        className: 'ola-img-link'
      }
      : {}

    const imageUrl = `${baseUrl}${thumbnail}`
    const imgThumbnail = useBackgroundImage ? (
      <div
        className='ola-img ola-img-bg'
        {...restProps}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    ) : (
      <img
        className='ola-img'
        {...restProps}
        width={width}
        src={`${baseUrl}${thumbnail}`}
        alt=''
        onError={this.handleError}
        onLoad={this.handleLoad}
      />
    )

    const classes = cx('ola-field', 'ola-field-img', {
      'ola-field-loading': showLoading && !this.state.loaded
    })

    return (
      <div className={classes}>
        {isLink ? <a {...linkProps}>{imgThumbnail}</a> : imgThumbnail}
        {caption ? (
          <div className='ola-field-img-caption'>{caption}</div>
        ) : null}
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
  width: 200,
  placeholder: null
}

module.exports = withConfig(withLogger(Thumbnail))
