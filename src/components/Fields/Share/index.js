import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import withToggle from './../../../decorators/withToggle'
import withLogger from './../../../decorators/withLogger'
import listensToClickOutside from '@olasearch/react-onclickoutside'
import Facebook from '@olasearch/icons/lib/facebook'
import Twitter from '@olasearch/icons/lib/twitter'
import Mail from '@olasearch/icons/lib/mail'
import LinkedIn from '@olasearch/icons/lib/linkedin'
import GPlus from '@olasearch/icons/lib/material-gplus'
import hoistNonReactStatics from 'hoist-non-react-statics'
import Arrow from './../../Arrow'

/**
 * Displays a share button
 */
class Share extends React.PureComponent {
  handleClick = (e) => {
    const url = e.currentTarget.getAttribute('data-href')
    const type = e.currentTarget.getAttribute('data-type')
    this.props.log({
      eventType: 'C',
      result: this.props.result,
      eventCategory: 'Share',
      eventAction: 'click',
      eventLabel: type,
      debounce: false,
      snippetId: this.props.snippetId,
      payload: this.props.logPayload
    })
    /**
     * Always open a new window
     */
    window.open(url)
  }
  handleClickOutside = () => {
    this.props.hide()
  }
  render () {
    const {
      result,
      isCollapsed,
      toggle,
      email,
      facebook,
      twitter,
      linkedIn,
      gplus,
      label,
      buttonClassName,
      position
    } = this.props
    const { title, url } = result
    const { location } = window
    const emailUrl = `mailto:?&subject=${title}&body=${url}`
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}&redirect_uri=${
      location.href
    }`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`
    const linkedInUrl = `https://www.linkedin.com/cws/share?url=${url}`
    const gplusUrl = `https://plus.google.com/share?url=${url}`
    const classes = cx('ola-share-links', {
      'ola-drop-open': isCollapsed,
      [`ola-drop-position-${position}`]: position
    })
    return (
      <div className={classes}>
        <button className={buttonClassName} type='button' onClick={toggle}>
          {label}
        </button>
        <div className='ola-drop'>
          <Arrow position={position} />
          <div className='ola-drop-body'>
            {email && (
              <button
                type='button'
                className='ola-drop-link'
                data-href={emailUrl}
                data-type='email'
                onClick={this.handleClick}
              >
                <Mail />
                <span className='ola-drop-link-text'>Email</span>
              </button>
            )}
            {facebook && (
              <button
                type='button'
                className='ola-drop-link'
                data-href={facebookUrl}
                data-type='facebook'
                onClick={this.handleClick}
              >
                <Facebook />
                <span className='ola-drop-link-text'>Facebook</span>
              </button>
            )}
            {twitter && (
              <button
                type='button'
                className='ola-drop-link'
                data-href={twitterUrl}
                data-type='twitter'
                onClick={this.handleClick}
              >
                <Twitter />
                <span className='ola-drop-link-text'>Twitter</span>
              </button>
            )}
            {linkedIn && (
              <button
                type='button'
                className='ola-drop-link'
                data-href={linkedInUrl}
                data-type='linkedIn'
                onClick={this.handleClick}
              >
                <LinkedIn />
                <span className='ola-drop-link-text'>LinkedIn</span>
              </button>
            )}
            {gplus && (
              <button
                type='button'
                className='ola-drop-link'
                data-href={gplusUrl}
                data-type='gplus'
                onClick={this.handleClick}
              >
                <GPlus />
                <span className='ola-drop-link-text'>Google plus</span>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Share.defaultProps = {
  email: false,
  facebook: true,
  twitter: true,
  linkedIn: true,
  gplus: true,
  label: 'Share',
  document: null,
  buttonClassName: 'ola-btn ola-btn-share',
  alignTo: 'left'
}

Share.propTypes = {
  /**
   * Search result
   */
  result: PropTypes.object.isRequired,
  /**
   * Label of the button
   */
  label: PropTypes.string,
  /**
   * Show facebook
   */
  facebook: PropTypes.bool,
  /**
   * Show twitter
   */
  twitter: PropTypes.bool,
  /**
   * Show linkedIn
   */
  linkedIn: PropTypes.bool,
  /**
   * Show gplus
   */
  gplus: PropTypes.bool,
  /**
   * Show email
   */
  email: PropTypes.bool,
  /**
   * Align dropdown to
   */
  alignTo: PropTypes.oneOf(['right', 'left'])
}

const ShareButton = withLogger(withToggle(listensToClickOutside(Share)))

export default hoistNonReactStatics(ShareButton, Share)
