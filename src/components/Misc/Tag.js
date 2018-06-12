import React from 'react'
import PropTypes from 'prop-types'
import { supplant, getDisplayName } from './../../utilities'
import DateParser from './../../utilities/dateParser'
import {
  DEFAULT_DISPLAY_DATE_FORMAT,
  DEFAULT_RANGE_TEMPLATE,
  NUMERICAL_RANGE
} from './../../constants/Settings'
import Cross from '@olasearch/icons/lib/x'

/**
 * Display a tag with a remove button
 * @example ./src/components/Misc/Tag.md
 */
function Tag (props) {
  var displayName = ''
  var { name, onRemove, facet } = props
  var {
    type,
    label,
    template = DEFAULT_RANGE_TEMPLATE,
    facetNames,
    dateFormat = DEFAULT_DISPLAY_DATE_FORMAT,
    interval
  } = facet

  switch (type) {
    case 'range':
    case 'daterange':
    case 'datepicker':
      if (typeof name === 'string') {
        displayName = name
      } else {
        let [fromRange, toRange] = name
        const _from =
          type !== NUMERICAL_RANGE && dateFormat
            ? DateParser.formatUTC(fromRange, dateFormat, 'from')
            : fromRange
        const _to =
          type !== NUMERICAL_RANGE && dateFormat
            ? DateParser.formatUTC(toRange, dateFormat, 'to')
            : toRange
        /* All dates will be in UTC */
        displayName =
          _from === _to
            ? _from
            : supplant(template, {
              from: _from,
              to: _to,
              name: facet.displayName || facet.name
            })
      }
      break

    case 'rating':
      let index = name[0] / interval
      displayName = label[index]
      break

    case 'geo_distance':
      displayName = facet.displayName || name
      break

    case 'boolean':
      displayName = facet.valueDisplayName || getDisplayName(facetNames, name)
      break

    default:
      displayName = getDisplayName(facetNames, name)
      break
  }

  return (
    <div className='ola-facet-tag'>
      <span className='ola-facet-tag-name'>{displayName}</span>
      <button className='ola-facet-tag-remove' onClick={onRemove}>
        <span>{props.buttonLabel}</span>
        <Cross size={16} />
      </button>
    </div>
  )
}

Tag.propTypes = {
  name: PropTypes.any,
  onRemove: PropTypes.func,
  facet: PropTypes.object,
  buttonLabel: PropTypes.string
}

Tag.defaultProps = {
  buttonLabel: 'Remove'
}

module.exports = Tag
