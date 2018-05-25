import React from 'react'
import PropTypes from 'prop-types'
import withLogger from './../../../decorators/withLogger'
import Tag from '@olasearch/icons/lib/tag'
import FieldLabel from './../FieldLabel'
import { getDisplayName } from './../../../utilities'
import classNames from 'classnames'
// import { connect } from 'react-redux'
// import { addFacet, executeSearch } from './../../../actions/Search'

function Pill ({
  fieldLabel,
  iconSize,
  value,
  log,
  displayIcon,
  snippetId,
  isLink,
  executeSearch,
  inlineLabel
}) {
  /* If there are no pills */
  if (!value || !value.length) return null
  if (typeof value === 'string') value = [value]
  let classes = classNames('ola-field ola-field-pill', {
    'ola-field-label-inline': inlineLabel
  })
  return (
    <div className={classes}>
      <FieldLabel label={fieldLabel} />
      {value.map((name, idx) => (
        <span className='ola-flex ola-btn-pill' key={idx}>
          <span className='ola-flex-icon'>
            <Tag />
          </span>
          <span className='ola-flex-content'>{getDisplayName(name)}</span>
        </span>
      ))}
    </div>
  )
}

Pill.defaultProps = {
  value: [],
  displayIcon: false,
  iconSize: 20,
  inlineLabel: false,
  isLink: false
}

Pill.propTypes = {
  /**
   * Pill name
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /**
   * Label will be inline
   */
  inlineLabel: PropTypes.bool,
  /**
   * Field label
   */
  fieldLabel: PropTypes.string
}

module.exports = withLogger(Pill)
