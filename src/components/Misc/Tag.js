import React from 'react'
import { supplant, getDisplayName } from './../../utilities'
import DateParser from './../../utilities/dateParser'

const Tag = (props, context) => {
  var displayName = ''
  var { name, onRemove, facet } = props
  var { type, label, template, facetNames, dateFormat, interval } = facet

  switch (type) {
    case 'range':
      if (typeof name === 'string') {
        displayName = name
      } else {
        let [ from, to ] = name
        displayName = supplant(template, { from, to })
      }
      break

    case 'daterange':
      let [ from, to ] = name
      let fromDate = new Date(parseInt(from))
      let toDate = new Date(parseInt(to))

      displayName = supplant(template, {
        from: DateParser.format(fromDate, dateFormat),
        to: DateParser.format(toDate, dateFormat)
      })
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
      <button className='ola-facet-tag-remove' onClick={onRemove}><span>Remove</span></button>
    </div>
  )
}

Tag.propTypes = {
  name: React.PropTypes.any,
  onRemove: React.PropTypes.func,
  facet: React.PropTypes.object
}

module.exports = Tag
