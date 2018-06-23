import React from 'react'
import FieldLabel from './../FieldLabel'
import PropTypes from 'prop-types'
import MailIcon from '@olasearch/icons/lib/mail'

/**
 * Display an Email button
 */
function Email ({ email, body, label, displayIcon, iconSize, fieldLabel }) {
  const link = `mailto:${email}&body=${body}`

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
  iconSize: PropTypes.number,
  /**
   * Search result
   */
  result: PropTypes.object
}

Email.defaultProps = {
  placeholder: ''
}

export default Email
