import React from 'react'
import classNames from 'classnames'
import withLogger from './../../decorators/OlaLogger'

class Button extends React.Component {
  handeClick = (event) => {
    this.props.log({
      eventType: 'C',
      result: this.props.result,
      eventCategory: this.props.label,
      eventAction: 'click'
    })

    event.preventDefault()
    window.location.href = this.props.url
  };
  render () {
    let { label, className } = this.props
    if (!label) return null

    let klass = classNames('ola-cta-button', className)
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
