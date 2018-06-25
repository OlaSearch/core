import React from 'react'
import PropTypes from 'prop-types'
import withLogger from './../../../decorators/withLogger'
import User from '@olasearch/icons/lib/user'
import FieldLabel from './../FieldLabel'
import { getDisplayName } from './../../../utilities'

/**
 * Render a single Person component
 * @param {Object} { name, url, onClick }
 */
function PersonComponent ({ name, url, onClick }) {
  return (
    <a
      className='ola-btn-person'
      title={name}
      onClick={(e) => onClick(e, name, url)}
    >
      <span className='ola-flex-content'>{getDisplayName(name)}</span>
    </a>
  )
}

/**
 * Displays a person
 */
function Person ({
  result,
  fieldLabel,
  iconSize,
  people,
  log,
  logPayload,
  displayIcon,
  snippetId,
  onClick
}) {
  /* Do not render if the prop people is empty */
  if (!people || !people.length) return null

  function handleClick (event, name, url) {
    /* Log the request */
    log({
      eventType: 'C',
      result,
      eventCategory: 'person',
      eventAction: 'click',
      eventLabel: name,
      snippetId,
      payload: logPayload
    })

    if (onClick) return onClick(event, name)

    /* Opens in a new window */
    if (url) window.open(url)
  }

  /* Parse to an array if people attribute is a string */
  const peopleArr = typeof people === 'string' ? [{ name: people }] : people
  const classes = 'ola-field ola-field-person'

  const peopleComponents = peopleArr.map((person, i) => (
    <PersonComponent key={i} {...person} onClick={handleClick} />
  ))

  return (
    <div className={classes}>
      <FieldLabel label={fieldLabel} />
      <div className='ola-field-people'>
        <div className='ola-flex'>
          {displayIcon && (
            <span className='ola-flex-icon'>
              <User size={iconSize} />
            </span>
          )}
          <div className='ola-flex-content'>{peopleComponents}</div>
        </div>
      </div>
    </div>
  )
}

Person.defaultProps = {
  people: '',
  fieldLabel: '',
  displayIcon: false,
  iconSize: 20,
  result: null
}

Person.propTypes = {
  /**
   * Name of the person | Array of Person:Object
   */
  people: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.object)
  ]),
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

export default withLogger(Person)
