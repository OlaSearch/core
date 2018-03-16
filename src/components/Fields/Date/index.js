import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  format as formatDate,
  isSameDay
} from './../../../utilities/dateParser'
import FieldLabel from './../FieldLabel'
import Calendar from '@olasearch/icons/lib/calendar'

const TIME_REGEX = /h{1,2}\:.*/
/**
 * Displays a formatted Date field
 */
function DateField ({
  date,
  endDate,
  allDayEvent,
  format,
  fieldLabel,
  inlineLabel,
  displayIcon,
  iconSize,
  dependentField,
  result,
  showIfEmpty
}) {
  if (!date) return null
  let formattedDate = ''
  let formattedEndDate = null
  let fallsOnSameDay = false
  let timeFormat = null
  try {
    formattedDate = formatDate(date, format)
  } catch (e) {
    console.warn(e)
    return null
  }
  if (endDate) {
    try {
      formattedEndDate = formatDate(endDate, format)
    } catch (e) {
      console.warn(e)
    }
  }
  /**
   * 1. check if start and end is the same day
   * @type {[type]}
   */
  if (endDate) {
    fallsOnSameDay = isSameDay(date, endDate)
    if (fallsOnSameDay) {
      let timeFormatMatches = TIME_REGEX.exec(format)
      timeFormat = timeFormatMatches ? timeFormatMatches[0] : null
      format = format.replace(TIME_REGEX, '').trim()
    }
  }
  const classes = classNames('ola-field ola-field-date', {
    'ola-field-daterange': formattedEndDate,
    'ola-field-label-inline': inlineLabel
  })
  return (
    <div className={classes}>
      <FieldLabel label={fieldLabel} />
      <div className='ola-flex'>
        {displayIcon && (
          <span className='ola-flex-icon'>
            <Calendar size={iconSize} />
          </span>
        )}
        <span className='ola-flex-content'>
          {formattedEndDate
            ? formattedEndDate === formattedDate
              ? formattedDate
              : fallsOnSameDay
                ? `${formatDate(date, format)}, ${formatDate(
                  date,
                  timeFormat
                )} - ${formatDate(endDate, timeFormat)}`
                : `${formattedDate} - ${formattedEndDate}`
            : formattedDate}
        </span>
      </div>
    </div>
  )
}

DateField.propTypes = {
  /**
   * Start date
   */
  date: PropTypes.string,
  /**
   * End date
   */
  endDate: PropTypes.string,
  /**
   * Display format of the date
   */
  format: PropTypes.string,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string,
  /**
   * Search result
   */
  result: PropTypes.object,
  /**
   * Show field if empty
   */
  showIfEmpty: PropTypes.bool,
  /**
   * Field which indicates its a all day event
   */
  allDayEvent: PropTypes.bool,
  /**
   * Displays a date icon
   */
  displayIcon: PropTypes.bool,
  /**
   * Icon size
   */
  iconSize: PropTypes.number,
  /**
   * Label will be inline
   */
  inlineLabel: PropTypes.bool
}

DateField.defaultProps = {
  endDate: null,
  allDayEvent: false,
  showIfEmpty: false,
  displayIcon: false,
  iconSize: 20
}

module.exports = DateField
