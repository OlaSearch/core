import React from 'react'
import { connect } from 'react-redux'
import FieldLabel from './../FieldLabel'
import PropTypes from 'prop-types'
import SMSIcon from '@olasearch/icons/lib/smartphone'

/**
 * Display an SMS button
 */
function SMS ({
  number,
  body,
  iconLeft = null,
  iconRight = null,
  label,
  Device,
  displayIcon,
  iconSize,
  fieldLabel
}) {
  let { isApple, isPhone } = Device
  let bodyText = isApple && isApple.device ? '&body' : '?body'
  let link = `sms:${number}${bodyText}=${body}`

  return (
    <div className='ola-field ola-field-sms'>
      <FieldLabel label={fieldLabel} />
      <a href={link} className='ola-flex ola-btn-sms'>
        {displayIcon && (
          <span className='ola-flex-icon'>
            <SMSIcon size={iconSize} />
          </span>
        )}
        <span className='ola-flex-content'>{label}</span>
      </a>
    </div>
  )
}

SMS.propTypes = {
  /**
   * Phone number
   */
  number: PropTypes.string,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string,
  /**
   * Displays a date icon
   */
  displayIcon: PropTypes.bool,
  /**
   * Icon size
   */
  iconSize: 20,
  /**
   * Search result
   */
  result: PropTypes.object,
  /**
   * Body of the SMS message
   */
  body: PropTypes.string
}

SMS.defaultProps = {
  label: 'SMS',
  placeholder: ''
}

function mapStateToProps (state) {
  return {
    Device: state.Device
  }
}

module.exports = connect(mapStateToProps)(SMS)
