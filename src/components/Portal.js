import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Close from '@olasearch/icons/lib/x'
import cx from 'classnames'
import { isFocusable } from './../utilities'
import { connect } from 'react-redux'

const ESC_KEY = 27

class ModalPortal extends React.Component {
  constructor (props) {
    super(props)
    this.shouldClose = null
  }
  handleContentOnClick = () => {
    this.shouldClose = false
  }
  handleContentOnMouseDown = () => {
    this.shouldClose = false
  }
  handleContentOnMouseUp = () => {
    this.shouldClose = false
  }
  handleOverlayOnClick = (event) => {
    if (this.shouldClose === null) {
      this.shouldClose = true
    }
    if (this.shouldClose) {
      this.requestClose(event)
    }
    this.shouldClose = null
  }
  componentDidUpdate (prevProps) {
    if (
      this.props.focusContent &&
      prevProps.isOpen !== this.props.isOpen &&
      this.props.isOpen
    ) {
      this.focusContent()
    }
  }
  focusContent = () => {
    this.content && this.content.focus()
  }
  requestClose = (event) => {
    this.props.onRequestClose && this.props.onRequestClose(event)
  }
  setContentRef = (ref) => {
    this.content = ref
  }
  handleKeyDown = (event) => {
    if (event.keyCode === ESC_KEY) {
      if (
        isFocusable(document.activeElement) &&
        document.activeElement.className !== this.props.closeClassName
      ) {
        return
      }
      event.stopPropagation()
      this.requestClose(event)
    }
  }
  render () {
    const {
      isOpen,
      inline,
      children,
      focusContent,
      isPhone,
      isTablet,
      isDesktop
    } = this.props
    if (!isOpen) return null
    const contentClass = cx(this.props.contentClassName)
    const overlayClass = cx(this.props.overlayClassName, {
      'ola-modal-inline': inline,
      'ola-modal-mobile': isPhone,
      'ola-modal-tablet': isTablet,
      'ola-modal-desktop': isDesktop
    })
    return (
      <div
        className={overlayClass}
        aria-modal='true'
        onClick={this.handleOverlayOnClick}
      >
        <div
          className={contentClass}
          onClick={this.handleContentOnClick}
          ref={this.setContentRef}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleContentOnMouseDown}
          onMouseUp={this.handleContentOnMouseUp}
          tabIndex={focusContent ? -1 : undefined}
        >
          <button
            className={this.props.closeClassName}
            onClick={this.requestClose}
          >
            <Close />
          </button>
          <div className={this.props.bodyClassName}>{children}</div>
        </div>
      </div>
    )
  }
}

/**
 * Portal are modal dialogs which are appended outside the React component tree. It is always appended to the parent document, even when called from the chatbot
 */
class Portal extends React.Component {
  constructor (props) {
    super(props)
    this.el = document.createElement('div')
    this.el.className = props.className
  }
  static defaultProps = {
    isOpen: false,
    className: 'ola-modal-portal',
    closeClassName: 'ola-modal-close',
    bodyClassName: 'ola-modal-body',
    overlayClassName: 'ola-modal-overlay',
    inline: false,
    contentClassName: 'ola-modal-content',
    focusContent: true
  }
  componentDidMount () {
    document.body.appendChild(this.el)
  }
  componentWillUnmount () {
    document.body.removeChild(this.el)
  }
  render () {
    return ReactDOM.createPortal(<ModalPortal {...this.props} />, this.el)
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  onRequestClose: PropTypes.func,
  contentClassName: PropTypes.string
}

export default connect((state) => ({
  isDesktop: state.Device.isDesktop,
  isTablet: state.Device.isTablet,
  isPhone: state.Device.isPhone
}))(Portal)
