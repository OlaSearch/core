import React from 'react'
import PropTypes from 'prop-types'
import withLogger from './../../../decorators/withLogger'
import Tag from '@olasearch/icons/lib/tag'
import FieldLabel from './../FieldLabel'
import { getDisplayName } from './../../../utilities'
import { CREATE_FILTER_OBJECT } from './../../../constants/Settings'
import { buildQueryString, HASH_CHARACTER } from './../../../services/urlSync'
import classNames from 'classnames'
import Button from './../Button'
import cx from 'classnames'

function Pill ({
  fieldLabel,
  onClick,
  iconSize,
  value,
  filterFieldName,
  log,
  logPayload,
  displayIcon,
  snippetId,
  isLink,
  result,
  config,
  inlineLabel,
  className,
  textClassName
}) {
  /* If there are no pills */
  if (!value || !value.length) return null
  if (typeof value === 'string') value = [value]
  const classes = classNames('ola-field ola-field-pill', {
    'ola-field-label-inline': inlineLabel
  })
  function createUrl (name) {
    if (!filterFieldName) return null
    const { fieldTypeMapping } = config
    const filterName =
      fieldTypeMapping && filterFieldName in fieldTypeMapping
        ? `${filterFieldName}_${fieldTypeMapping[filterFieldName]}`
        : filterFieldName
    const facet = CREATE_FILTER_OBJECT({ name: filterName })
    const selected = [name]
    const query = {
      facet_query: [{ ...facet, selected }]
    }
    return `${
      config ? config.searchPageUrl : ''
    }${HASH_CHARACTER}${buildQueryString(query)}`
  }
  function handleClick (event, name) {
    /* Log the request */
    log({
      eventType: 'C',
      result,
      eventCategory: 'pill',
      eventAction: 'click',
      eventLabel: name,
      snippetId,
      payload: logPayload
    })
    if (onClick) onClick(event, name)
  }
  const pillClasses = cx('ola-flex ola-btn-pill', className)
  const textClasses = cx('ola-flex-content', textClassName)
  const icon = (
    <span className='ola-flex-icon'>
      <Tag size={iconSize} />
    </span>
  )
  return (
    <div className={classes}>
      <FieldLabel label={fieldLabel} />
      {value.map((name, idx) => {
        const displayName = getDisplayName(name)
        const url = createUrl(name)
        return React.createElement(
          isLink ? Button : 'span',
          {
            className: pillClasses,
            key: idx,
            ...(isLink
              ? {
                result,
                snippetId,
                eventLabel: displayName,
                textLink: isLink,
                onClick: handleClick,
                url
              }
              : {})
          },
          <React.Fragment>
            {displayIcon ? icon : null}
            <span className={textClasses}>{displayName}</span>
          </React.Fragment>
        )
      })}
    </div>
  )
}

Pill.defaultProps = {
  value: [],
  displayIcon: false,
  iconSize: 20,
  inlineLabel: false,
  isLink: false,
  filterFieldName: null,
  textClassName: null,
  className: null
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

export default withLogger(Pill)
