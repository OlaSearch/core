import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import withToggle from './../../../decorators/withToggle'
import withLogger from './../../../decorators/withLogger'
import withTheme from './../../../decorators/withTheme'
import listensToClickOutside from '@olasearch/react-onclickoutside'
import Facebook from '@olasearch/icons/lib/facebook'
import Twitter from '@olasearch/icons/lib/twitter'
import Mail from '@olasearch/icons/lib/mail'
import LinkedIn from '@olasearch/icons/lib/linkedin'
import GPlus from '@olasearch/icons/lib/material-gplus'
import hoistNonReactStatics from 'hoist-non-react-statics'

/**
 * Displays a share button
 */
class Share extends React.PureComponent {
  handleClick = (e) => {
    let url = e.currentTarget.getAttribute('data-href')
    let type = e.currentTarget.getAttribute('data-type')
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
  render () {
    let {
      result,
      isCollapsed,
      toggle,
      email,
      facebook,
      twitter,
      linkedIn,
      gplus,
      label,
      ...rest
    } = this.props
    let { title, url } = result
    let { location } = window
    let emailUrl = `mailto:?&subject=${title}&body=${url}`
    let facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&title=${title}&redirect_uri=${location.href}`
    let twitterUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`
    let linkedInUrl = `https://www.linkedin.com/cws/share?url=${url}`
    let gplusUrl = `https://plus.google.com/share?url=${url}`
    let classes = cx('ola-share-links', {
      'ola-drop-open': isCollapsed
    })
    return (
      <div className={classes}>
        <button
          className='ola-btn ola-btn-share'
          type='button'
          onClick={toggle}
        >
          {label}
        </button>
        <div className='ola-drop'>
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
  label: 'Share'
}

Share.contextTypes = {
  document: PropTypes.object
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
  email: PropTypes.bool
}

const ShareButton = withLogger(
  withToggle(
    listensToClickOutside(Share, {
      handleClickOutside (instance) {
        return () => {
          instance.props.hide()
        }
      },
      getDocument (instance) {
        /* Bug in react - onclickoutside: Functional components dont have access to context */
        return instance.context.document || document
      }
    })
  )
)

module.exports = hoistNonReactStatics(ShareButton, Share)
