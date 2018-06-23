import React from 'react'
import PropTypes from 'prop-types'
import { sanitizePhone } from './../../../utilities'
import withTranslate from './../../../decorators/withTranslate'
import withLogger from './../../../decorators/withLogger'
import FieldLabel from './../FieldLabel'
import PhoneIcon from '@olasearch/icons/lib/phone'

/**
 * Display a phone number link
 */
function Phone (props) {
  const {
    phone,
    label,
    translate,
    log,
    onClick,
    result,
    snippetId,
    fieldLabel,
    logPayload,
    displayIcon,
    iconSize,
    ...rest
  } = props

  if (!phone) return null

  const url = 'tel://' + sanitizePhone(phone)

  function handleClick (event) {
    log({
      eventType: 'C',
      result,
      eventCategory: 'Call',
      eventAction: 'click',
      snippetId,
      payload: logPayload
    })
    onClick && onClick(event, result)
  }

  return (
    <div className='ola-field ola-field-phone'>
      <FieldLabel label={fieldLabel} />
      <a
        href={url}
        className='ola-flex ola-btn-phone'
        onClick={handleClick}
        {...rest}
      >
        {displayIcon && (
          <span className='ola-flex-icon'>
            <PhoneIcon size={iconSize} />
          </span>
        )}
        <span className='ola-flex-content'>
          {label || translate('call_label')}
        </span>
      </a>
    </div>
  )
}

Phone.defaultProps = {
  displayIcon: false,
  iconSize: 20
}

Phone.propTypes = {
  /**
   * Phone number
   */
  phone: PropTypes.string,
  /**
   * OnClick handler
   */
  onClick: PropTypes.func,
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
  result: PropTypes.object
}

export default withLogger(withTranslate(Phone))
