import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Close from '@olasearch/icons/lib/x'
import cx from 'classnames'
import { isFocusable } from './../utilities'

const TAB_KEY = 9
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
  componentDidUpdate (prevProps, prevState) {
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
    const { isOpen, inline, children, focusContent } = this.props
    if (!isOpen) return null
    const contentClass = cx('ola-modal-content', this.props.contentClassName)
    const overlayClass = cx('ola-modal-overlay', {
      'ola-modal-inline': inline
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
    inline: false,
    contentClassName: 'ola-modal-content-small',
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

export default Portal
