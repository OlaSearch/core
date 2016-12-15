import React from 'react'
import classNames from 'classnames'
import withLogger from './../../decorators/OlaLogger'

class Button extends React.Component {
  static defaultProps = {
    fullWidth: false
  };
  handeClick = (event) => {
    this.props.log({
      eventType: 'C',
      result: this.props.result,
      eventCategory: this.props.label,
      eventAction: 'click',
      snippetId: this.props.snippetId
    })

    if (this.props.onClick) return this.props.onClick(event, this.props.result)

    event.preventDefault()
    window.location.href = this.props.url
  };
  render () {
    let { label, className, fullWidth } = this.props
    if (!label) return null
    let klass = classNames('ola-cta-button', className, {
      'ola-btn-fullwidth': fullWidth
    })
    return (
      <a
        className={klass}
        onClick={this.handeClick}
        href={this.props.url}
      >
        {label}
      </a>
    )
  }
}

module.exports = withLogger(Button)
