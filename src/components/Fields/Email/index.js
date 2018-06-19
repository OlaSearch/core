import React from 'react'
import { connect } from 'react-redux'
import FieldLabel from './../FieldLabel'
import PropTypes from 'prop-types'
import MailIcon from '@olasearch/icons/lib/mail'

/**
 * Display an Email button
 */
function Email ({
  email,
  body,
  iconLeft = null,
  iconRight = null,
  label,
  Device,
  displayIcon,
  iconSize,
  fieldLabel
}) {
  // let { isApple, isPhone } = Device
  // let bodyText = isApple && isApple.device ? '&body' : '?body'
  let link = `mailto:${email}`

  return (
    <div className='ola-field ola-field-email'>
      <FieldLabel label={fieldLabel} />
      <a href={link} className='ola-flex ola-btn-email'>
        {displayIcon && (
          <span className='ola-flex-icon'>
            <MailIcon size={iconSize} />
          </span>
        )}
        <span className='ola-flex-content'>{label || email}</span>
      </a>
    </div>
  )
}

Email.propTypes = {
  /**
   * Email address
   */
  email: PropTypes.string,
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

Email.defaultProps = {
  placeholder: ''
}

function mapStateToProps (state) {
  return {
    Device: state.Device
  }
}

export default connect(mapStateToProps)(Email)
